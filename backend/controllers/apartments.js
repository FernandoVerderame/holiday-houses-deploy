// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo la funzione per generare lo slug
const createSlug = require("../utils/slug.js");

// Importo la delete pic
const deletePic = require("../utils/deletePic.js");

// Importo jwt
const jwt = require("jsonwebtoken");

// Importo axios per le richieste API
const axios = require("axios");

// Importo host e port
require("dotenv").config();
const { PORT, HOST, TOMTOM_API_KEY } = process.env;
const port = PORT || 3000;

// Store
const store = async (req, res) => {

    const { title, description, rooms, beds, bathrooms, sqm, guests, address, services } = req.body;

    // Recupero l'ID dell'utente tramite il token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const userId = user.id;

    // Genero lo slug
    const slug = createSlug(title);

    // Variabile per latitudine e longitudine
    let latitude = null;
    let longitude = null;

    try {
        // Effettua una richiesta all'API di TomTom per ottenere latitudine e longitudine
        const tomTomResponse = await axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`, {
            params: {
                key: TOMTOM_API_KEY,
                limit: 1, // Recupera solo un risultato
            }
        });

        const results = tomTomResponse.data.results;

        if (results.length > 0) {
            // Prendo latitudine e longitudine dal primo risultato
            latitude = results[0].position.lat;
            longitude = results[0].position.lon;
        } else {
            return res.status(400).json({ error: "Indirizzo non valido" });
        }

        // Dati dell'appartamento
        const data = {
            title,
            slug: slug,
            cover: req.file ? `${HOST}:${port}/apartment_covers/${req.file.filename}` : '',
            description,
            visible: req.body.visible ? true : false,
            rooms: parseInt(rooms),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
            sqm: parseInt(sqm),
            guests: parseInt(guests),
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            userId,
            services: {
                connect: services.map(service => ({ id: parseInt(service.id) })) // Converti id del servizio a numero intero
            }
        };

        const apartment = await prisma.apartment.create({
            data
        });

        res.status(200).json(apartment);
    } catch (err) {
        if (req.file) {
            deletePic('apartment_covers', req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

// Index
const index = async (req, res) => {
    try {
        const where = {};
        const { visible, page = 1, limit = 9 } = req.query;

        // Filtro pubblicato
        if (visible === 'true') {
            where.visible = true
        } else if (visible === 'false') {
            where.visible = false
        }

        // Paginazione
        const offset = (page - 1) * limit;

        const totalItems = await prisma.apartment.count({ where });
        const totalPages = Math.ceil(totalItems / limit);

        if (totalPages === 0) {
            return res.json({
                data: [],
                page,
                totalItems,
                totalPages
            });
        }

        if (page > totalPages) {
            throw new Error(`La pagina ${page} non esiste.`);
        }

        const apartments = await prisma.apartment.findMany({
            where,
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            include: {
                services: {
                    select: {
                        id: true,
                        label: true,
                        icon: true
                    }
                }
            },
            take: parseInt(limit),
            skip: parseInt(offset)
        });
        res.json({
            data: apartments,
            page,
            totalItems,
            totalPages
        });
    } catch (err) {
        errorHandler(err, req, res);
    }

}

// Show
const show = async (req, res) => {
    try {
        const { slug } = req.params;
        const apartment = await prisma.apartment.findUnique({
            where: { slug },
            include: {
                services: {
                    select: {
                        id: true,
                        label: true,
                        icon: true
                    }
                }
            }
        });

        if (apartment) {
            res.json(apartment);
        } else {
            throw new Error(`Appartamento con slug: ${slug} non trovato.`, 404);
        }

    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Update
const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, description, rooms, beds, bathrooms, sqm, guests, address, services } = req.body;

        // Recupero l'ID dell'utente tramite il token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        // Recupero l'appartamento
        const existingApartment = await prisma.apartment.findUnique({
            where: { slug }
        });

        if (!existingApartment) {
            return res.status(404).json({ error: "Appartamento non trovato" });
        }

        if (existingApartment.userId !== userId) {
            return res.status(403).json({ error: "Non hai il permesso di aggiornare questo appartamento" });
        }

        // Genero lo slug
        const newSlug = createSlug(title);

        // Variabile per latitudine e longitudine
        let latitude = existingApartment.latitude;
        let longitude = existingApartment.longitude;

        // Se l'indirizzo è stato modificato, recupero nuove coordinate
        if (address && address !== existingApartment.address) {
            const tomTomResponse = await axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`, {
                params: {
                    key: TOMTOM_API_KEY,
                    limit: 1,
                }
            });

            const results = tomTomResponse.data.results;
            if (results.length > 0) {
                latitude = results[0].position.lat;
                longitude = results[0].position.lon;
            } else {
                return res.status(400).json({ error: "Indirizzo non valido" });
            }
        }

        // Dati dell'appartamento da aggiornare
        const data = {
            title,
            slug: newSlug,
            cover: req.file ? `${HOST}:${port}/apartment_covers/${req.file.filename}` : existingApartment.cover,
            description,
            visible: req.body.visible ? true : false,
            rooms: parseInt(rooms),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
            sqm: parseInt(sqm),
            guests: parseInt(guests),
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            services: {
                set: services.map(service => ({ id: parseInt(service.id) })) // Aggiorno i servizi collegati
            }
        };

        const updatedApartment = await prisma.apartment.update({
            where: { slug },
            data,
            include: {
                services: {
                    select: {
                        id: true,
                        label: true,
                        icon: true
                    }
                }
            }
        });

        res.json(updatedApartment);

    } catch (err) {
        if (req.file) {
            deletePic('apartment_covers', req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res) => {
    try {
        const { slug } = req.params;
        // Trova l'appartamento e tutte le immagini correlate
        const apartment = await prisma.apartment.findUnique({
            where: { slug },
            include: {
                images: true // Includi le immagini correlate
            }
        });

        if (!apartment) {
            return res.status(404).json({ message: 'Appartamento non trovato' });
        }

        // Elimina l'appartamento (e le immagini correlate grazie al cascade)
        await prisma.apartment.delete({
            where: { slug }
        });

        // Elimina il file di copertina, se esiste
        const coverImageName = apartment.cover.replace(`${HOST}:${port}/apartment_covers/`, '');
        if (apartment.cover) deletePic('apartment_covers', coverImageName);

        // Elimina le immagini correlate dal filesystem
        apartment.images.forEach(image => {
            const imageName = image.url.replace(`${HOST}:${port}/apartment_images/`, '');
            deletePic('apartment_images', imageName);
        });

        res.status(200).json(`Appartamento con slug: ${slug} eliminato con successo.`);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}
// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo la delete pic
const deletePic = require("../utils/deletePic.js");

// Importo jwt
const jwt = require("jsonwebtoken");

// Importo host e port
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

// Store 
const store = async (req, res, next) => {

    const { apartmentId } = req.body;

    try {
        const data = {
            url: req.file ? `${HOST}:${port}/apartment_images/${req.file.filename}` : '',
            apartmentId: parseInt(apartmentId)
        }

        const image = await prisma.image.create({
            data
        });

        res.status(200).json(image);
    } catch (err) {
        if (req.file) {
            deletePic('apartment_images', req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

// Index
const index = async (req, res, next) => {
    try {
        const images = await prisma.image.findMany({
            include: {
                apartment: true
            }
        });
        res.json(images);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const image = await prisma.image.delete({
            where: { id: parseInt(id) }
        });

        const imageName = image.url.replace(`${HOST}:${port}/apartment_images/`, '');

        if (image.url) deletePic('apartment_images', imageName);

        res.status(200).json(`Immagine con id: ${id} eliminata con successo.`);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index,
    destroy
}
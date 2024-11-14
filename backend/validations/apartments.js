// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Il titolo è obbligatorio!',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa!',
            bail: true
        },
        isLength: {
            errorMessage: 'Il titolo deve contenere almeno 5 caratteri!',
            options: { min: 5 }
        },
        trim: true
    },

    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'La descrizione è obbligatoria!',
            bail: true
        },
        isString: {
            errorMessage: 'La descrizione non può contenere solo numeri!',
            bail: true
        },
        isLength: {
            errorMessage: 'La descrizione deve contenere tra 20 e 1000 caratteri!',
            options: { min: 20, max: 1000 }
        },
        trim: true
    },

    visible: {
        in: ["body"],
        isBoolean: {
            errorMessage: 'Visible può essere solo vero o falso!'
        },
        toBoolean: true
    },

    services: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'I servizi sono obbligatori!',
            bail: true
        },
        isArray: {
            errorMessage: 'I servizi devono essere passate come array!',
            bail: true
        },
        custom: {
            options: async (idStrings) => {
                const ids = idStrings.map(id => parseInt(id));
                if (ids.length === 0) {
                    throw new Error(`Un appartamento deve avere almeno un servizio!`);
                }
                const notIntegerId = ids.find(id => isNaN(parseInt(id)));
                if (notIntegerId) {
                    throw new Error(`Uno o più ID non sono dei numeri interi.`);
                }
                const services = await prisma.service.findMany({
                    where: { id: { in: ids } }
                });
                if (services.length !== ids.length) {
                    throw new Error(`Uno o più servizi specificati non esistono!`);
                }
                return true;
            }
        },
        customSanitizer: {
            options: (ids) => ids.map(id => ({ id: parseInt(id) }))
        }
    },

    rooms: {
        in: ["body"],
        isInt: {
            errorMessage: 'Il numero di stanze deve essere un numero intero positivo!',
            options: { min: 1 }
        },
        toInt: true // Converte il valore in un numero intero
    },

    beds: {
        in: ["body"],
        isInt: {
            errorMessage: 'Il numero di letti deve essere un numero intero positivo!',
            options: { min: 1 }
        },
        toInt: true
    },

    bathrooms: {
        in: ["body"],
        isInt: {
            errorMessage: 'Il numero di bagni deve essere un numero intero positivo!',
            options: { min: 1 }
        },
        toInt: true
    },

    sqm: {
        in: ["body"],
        isInt: {
            errorMessage: 'La dimensione in metri quadri deve essere un numero intero positivo!',
            options: { min: 1 }
        },
        toInt: true
    },

    guests: {
        in: ["body"],
        isInt: {
            errorMessage: 'Il numero di ospiti deve essere un numero intero positivo!',
            options: { min: 1 }
        },
        toInt: true
    }
}

module.exports = bodyData;
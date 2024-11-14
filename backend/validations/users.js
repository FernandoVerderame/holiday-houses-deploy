// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

const registerBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "L'eamil è obbligatoria!",
            bail: true
        },
        isEmail: {
            errorMessage: "Email non valida!",
            bail: true
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });

                if (user) {
                    throw new Error("Esiste già un utente con questa mail!");
                }
                return true;
            }
        },
        trim: true
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Il nome deve essere una stringa!"
        },
        isLength: {
            errorMessage: 'Name deve essere di almeno 3 caratteri!',
            options: { min: 3 }
        },
        trim: true
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "La password è obbligatoria!",
            bail: true
        },
        isString: {
            errorMessage: "Il nome deve essere una stringa!",
            bail: true
        },
        isLength: {
            errorMessage: "La password deve essere di almeno 8 caratteri",
            options: { min: 8 }
        },
        trim: true
    }
}

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "L'eamil è obbligatoria!",
            bail: true
        },
        isEmail: {
            errorMessage: "Email non valida!",
        },
        trim: true
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio!',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa!',
        },
        trim: true
    }
}

module.exports = {
    registerBody,
    loginBody
}
// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo jwt
const jwt = require("jsonwebtoken");

// Store
const store = async (req, res, next) => {

    const { name, email, content } = req.body;

    const data = {
        name,
        email,
        phone: req.body.phone ? req.body.phone : '',
        content,
        userId: 1
    }

    try {
        const message = await prisma.message.create({ data });
        res.status(200).send(message);
    } catch (err) {
        errorHandler(err, req, res);
    }

}

// Index
const index = async (req, res, next) => {

    try {

        // Recupero l'ID dell'utente tramite il token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        let messages;
        let messageCount;

        if (user.isSuperAdmin) {

            messages = await prisma.message.findMany({
                orderBy: [
                    { createdAt: 'desc' }
                ], include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            messageCount = await prisma.message.count();

        } else {

            messages = await prisma.message.findMany({
                where: { userId },
                orderBy: [
                    { createdAt: 'desc' }
                ], include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            messageCount = await prisma.message.count({ where: { userId } });
        }

        res.json({
            data: messages,
            messageCount
        })
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Show
const show = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const message = await prisma.message.findUnique({
            where: { id }
        });
        if (message) {
            res.json(message);
        } else {
            throw new Error(`Messaggio con id ${id} non trovato.`, 404);
        }
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.message.delete({
            where: { id },
        });
        res.json(`Messaggio con id ${id} eliminato con successo.`);
    } catch (err) {
        errorHandler(err, req, res);
    }

}

module.exports = {
    store,
    index,
    show,
    destroy
}
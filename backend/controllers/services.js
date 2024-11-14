// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Store
const store = async (req, res, next) => {

    const { label, icon } = req.body;

    const data = {
        label,
        icon
    }

    try {
        const service = await prisma.service.create({ data });
        res.status(200).send(service);
    } catch (err) {
        errorHandler(err, req, res);
    }

}

// Index
const index = async (req, res, next) => {
    try {

        const services = await prisma.service.findMany();
        res.json(services);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Show
const show = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const service = await prisma.service.findUnique({
            where: { id }
        });
        if (service) {
            res.json(service);
        } else {
            throw new Error(`Servizio con id ${id} non trovata.`, 404);
        }
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Update
const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const service = await prisma.service.update({
            where: { id },
            data: req.body,
        });
        res.json(service);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.service.delete({
            where: { id },
        });
        res.json(`Servizio con id ${id} eliminata con successo.`);
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
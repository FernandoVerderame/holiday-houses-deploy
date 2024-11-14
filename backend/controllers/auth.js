// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo hashPassword
const { hashPassword, comparePassword } = require("../utils/password.js");

// Importo generateToken
const generateToken = require("../utils/generateToken.js");

// Register
const register = async (req, res) => {

    try {

        const { email, name, password } = req.body;

        const data = {
            email,
            name,
            password: await hashPassword(password)
        }

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name,
            isAdmin: true,
            isSuperAdmin: false
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("Email o password errati!");
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email o password errati!");
        }

        const token = generateToken({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isSuperAdmin: user.isSuperAdmin
        });

        delete user.id;
        delete user.password;
        res.json({ token, data: user });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Index degli users
const index = async (req, res) => {

    try {

        const users = await prisma.user.findMany();

        users.find(user => {
            delete user.id;
            delete user.password;
        });

        res.status(200).json(users);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Patch degli users
const patch = async (req, res) => {
    try {

        const { email } = req.params;

        const { isAdmin } = req.body;

        const data = { isAdmin: isAdmin === 'true' ? true : false }

        const user = await prisma.user.update({
            where: { email },
            data
        });

        delete user.id;
        delete user.password;

        res.status(200).send(user);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Destroy degli users
const destroy = async (req, res) => {
    try {

        const { email } = req.params;

        const user = await prisma.user.delete({ where: { email } });

        res.status(200).send(`User ${user.name} con email: ${email} eliminato con successo!`);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    register,
    login,
    index,
    patch,
    destroy
}
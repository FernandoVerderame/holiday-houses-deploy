const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw new Error('Token non fornito!', 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            throw new Error('Token non valido!', 403);
        }
        req.user = data;
        next();
    });

}

module.exports = authToken;
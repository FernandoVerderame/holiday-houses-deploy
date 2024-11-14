// Importo express e dotenv
const express = require('express');
const dotenv = require("dotenv");

// Importo Cors
const cors = require("cors");

// Importo i ruoters
const apartmentsRouter = require("./routers/apartments.js");
const servicesRouter = require("./routers/services.js");
const messagesRouter = require("./routers/messages.js");
const imagesRouter = require("./routers/images.js");
const reviewsRouter = require("./routers/reviews.js");
const authRouter = require("./routers/auth.js");

// Importo i middlewares
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");

dotenv.config();

// Inizializzo express
const app = express();

app.use(cors());

// Definisco le variabili port e host
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// application/json
app.use(express.json());

// Cartella public per l'upload
app.use(express.static("public"));

// Rotte autenticazione
app.use('/auth', authRouter);

// Router delle foto
app.use('/apartments', apartmentsRouter);

// Router delle categorie
app.use('/services', servicesRouter);

// Router dei messaggi
app.use('/messages', messagesRouter);

// Router delle immagini
app.use('/images', imagesRouter);

// Router delle recensioni
app.use('/reviews', reviewsRouter);

// notFound
app.use(notFound);

// errorHandler
app.use(errorHandler);

module.exports = app;

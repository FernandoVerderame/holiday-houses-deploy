// Importo express e dotenv
const express = require('express');
const dotenv = require("dotenv");

// Importo i ruoters
const apartmentsRouter = require("./routers/apartments.js");

const servicesRouter = require("./routers/services.js");

const messagesRouter = require("./routers/messages.js");

const imagesRouter = require("./routers/images.js");

const reviewsRouter = require("./routers/reviews.js")

const authRouter = require("./routers/auth.js");

// Importo i middlewares
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");

// Inizializzo express
const app = express();

// Importo Cors
const cors = require("cors");

app.use(cors());

// Definisco le variabili port e host
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

dotenv.config();

// Cartella public per l'upload
app.use(express.static("public"));

// application/json
app.use(express.json());

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

// Avvio il server
app.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
});
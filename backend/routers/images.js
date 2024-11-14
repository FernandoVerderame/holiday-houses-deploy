// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione Admin
const adminPermission = require("../middlewares/authAdmin.js");

// Importo multer ed il path
const multer = require("multer");
const path = require("path");

// Configurazione Multer per l'upload delle immagini
const storage = multer.diskStorage({
    destination: "public/apartment_images",
    filename: (req, file, cf) => {
        const fileType = path.extname(file.originalname);
        cf(null, String(Date.now()) + fileType)
    }
});
const upload = multer({ storage });

// Importo il controller delle foto
const {
    store,
    index,
    destroy
} = require("../controllers/images.js");

// ? Rotte pubbliche
// Rotta index
router.get('/', index);

// ? Rotte Protette
router.use(authenticateToken);

// ! Rotte Admin
router.use(adminPermission);

// Rotta store
router.post('/', upload.single("url"), store);

//Rotta destroy
router.delete('/:id', destroy);

module.exports = router;
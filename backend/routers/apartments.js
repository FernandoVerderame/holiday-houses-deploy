// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require('../middlewares/validator.js');

// Importo il validatore dello slug
const validationSlug = require("../validations/validationSlug.js");

// Importo il bodyData
const bodyData = require("../validations/apartments.js");

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione Admin
const adminPermission = require("../middlewares/authAdmin.js");

// Importo multer ed il path
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "public/apartment_covers",
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
    show,
    update,
    destroy
} = require("../controllers/apartments.js");

// ? Rotte pubbliche
// Rotta index
router.get('/', index);

// ? Validatore dello slug
router.use('/:slug', validator(validationSlug));

// Rotta show
router.get('/:slug', show);

// ? Rotte Protette
router.use(authenticateToken);

// ! Rotte Admin
router.use(adminPermission);

// Rotta store
router.post('/', [
    upload.single("cover"),
    validator(bodyData)
], store);

// Rotta update
router.put('/:slug', [
    upload.single("cover"),
    validator(bodyData)
], update);

//Rotta destroy
router.delete('/:slug', destroy);

module.exports = router;

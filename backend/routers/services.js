// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require('../middlewares/validator.js');

// Validazioni
const bodyData = require('../validations/services.js');

// Validazione dell'ID
const paramID = require('../validations/generic.js');

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione Admin
const adminPermission = require("../middlewares/authAdmin.js");

// Importo le funzioni delle categorie
const {
    store,
    index,
    show,
    update,
    destroy
} = require("../controllers/services.js");

// Rotta index
router.get('/', index);

// ? Rotte Protette
router.use(authenticateToken);

// ! Rotte Admin
router.use(adminPermission);

// Rotta store
router.post('/', validator(bodyData), store);

// ? Validatore dell'ID
router.use('/:id', validator(paramID));

// Rotta show
router.get('/:id', show);

// Rotta update
router.put('/:id', validator(bodyData), update);

// Rotta destroy
router.delete('/:id', destroy);

module.exports = router;
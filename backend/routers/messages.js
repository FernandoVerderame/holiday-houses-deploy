// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require('../middlewares/validator.js');

// Importo validazioni
const bodyData = require("../validations/messages.js");

// Validazione dell'ID
const paramID = require('../validations/generic.js');

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione Admin
const adminPermission = require("../middlewares/authAdmin.js");

// Importo le funzioni dei messaggi
const {
    store,
    index,
    show,
    destroy
} = require("../controllers/messages.js");

// Rotta store
router.post('/', validator(bodyData), store);

// ? Rotte Protette
router.use(authenticateToken);

// ! Rotte Admin
router.use(adminPermission);

// Rotta index
router.get('/', index);

// ? Validatore dell'ID
router.use('/:id', validator(paramID));

// Rotta show
router.get('/:id', show);

// Rotta destroy
router.delete('/:id', destroy);

module.exports = router;
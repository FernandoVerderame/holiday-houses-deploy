// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require('../middlewares/validator.js');

// Importo validazioni
const bodyData = require("../validations/reviews.js");

// Validazione dell'ID
const paramID = require('../validations/generic.js');

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione Admin
const adminPermission = require("../middlewares/authAdmin.js");

// Importo le funzioni delle recensioni
const {
    store,
    index,
    show,
    destroy,
    toggle
} = require("../controllers/reviews.js");

// Rotta store
router.post('/', store);

// Rotta index
router.get('/', index);

// ? Rotte Protette
router.use(authenticateToken);

// ! Rotte Admin
router.use(adminPermission);

// ? Validatore dell'ID
router.use('/:id', validator(paramID));

// Rotta show
router.get('/:id', show);

// Rotta destroy
router.delete('/:id', destroy);

// Rotta patch per aggiornare lo stato della recensione
router.patch('/:id', toggle);

module.exports = router;
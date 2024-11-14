// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require("../middlewares/validator.js");

// Importo le validazioni dell'users
const { registerBody, loginBody } = require("../validations/users.js");

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione SuperAdmin
const superAdminPermission = require("../middlewares/authSuperAdmin.js");

const {
    register,
    login,
    index,
    patch,
    destroy
} = require("../controllers/auth.js");

// Rotta registrazione
router.post('/register', validator(registerBody), register);

// Rotta login 
router.post('/login', validator(loginBody), login);

// Validatore del Token e del Super Admin
router.use('/users', [authenticateToken, superAdminPermission]);

// Rotta Index
router.get('/users', index);

// Rotta Patch
router.patch('/users/:email', patch);

// Rotta Delete
router.delete('/users/:email', destroy);

module.exports = router;
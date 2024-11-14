const { checkSchema, validationResult } = require("express-validator");
const deletePic = require("../utils/deletePic.js");

const validator = (schema) => {
    return [
        checkSchema(schema),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                if (req.file) {
                    deletePic('photo_pics', req.file.filename);
                }
                return res.status(400).json({ errors: errors.array() })
            }
            next();
        }
    ]
}

module.exports = validator;
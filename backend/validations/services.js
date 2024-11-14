const bodyData = {
    label: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Il nome è obbligatorio!',
            bail: true
        },
        isString: {
            errorMessage: 'Il nome deve essere una stringa!',
            bail: true
        },
        isLength: {
            errorMessage: 'Il nome deve contenere almeno 3 caratteri!',
            options: { min: 3 }
        },
        trim: true
    }
}

module.exports = bodyData;
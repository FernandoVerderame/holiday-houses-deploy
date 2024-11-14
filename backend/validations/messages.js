const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is mandatory!",
            bail: true
        },
        isString: {
            errorMessage: "Name not valid!",
            bail: true
        },
        isLength: {
            errorMessage: 'Name must be at least 3 characters!',
            options: { min: 3 }
        },
        trim: true
    },
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is mandatory!",
            bail: true
        },
        isEmail: {
            errorMessage: "Email not valid!",
            bail: true
        },
        trim: true
    },
    content: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Content is mandatory!',
            bail: true
        },
        isString: {
            errorMessage: 'The content cannot contain only numbers!',
            bail: true
        },
        isLength: {
            errorMessage: 'The content must contain at least 20 characters!',
            options: { min: 20 }
        },
        trim: true
    }
}

module.exports = bodyData;
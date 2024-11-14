const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is mandatory!",
            bail: true
        },
        isString: {
            errorMessage: "Name must be a valid string!",
            bail: true
        },
        isLength: {
            errorMessage: 'Name must be at least 3 characters long!',
            options: { min: 3 }
        },
        trim: true
    },
    country: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Country is mandatory!",
            bail: true
        },
        isString: {
            errorMessage: "Country must be a valid string!",
            bail: true
        },
        isLength: {
            errorMessage: 'Country must be at least 3 characters long!',
            options: { min: 3 }
        },
        trim: true
    },
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Title is mandatory!",
            bail: true
        },
        isString: {
            errorMessage: "Title must be a valid string!",
            bail: true
        },
        isLength: {
            errorMessage: 'Title must be at least 3 characters long!',
            options: { min: 3 }
        },
        trim: true
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Description is mandatory!",
            bail: true
        },
        isString: {
            errorMessage: "Description must be a valid string!",
            bail: true
        },
        isLength: {
            errorMessage: 'Description must be between 10 and 1000 characters!',
            options: { min: 10, max: 1000 }
        },
        trim: true
    },
    rating: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Rating is mandatory!",
            bail: true
        },
        isInt: {
            errorMessage: "Rating must be an integer!",
            options: { min: 1, max: 5 }
        },
        toInt: true
    },
    apartmentId: {
        in: ["body"],
        optional: true,
        isInt: {
            errorMessage: "Apartment ID must be a valid integer if provided!",
            bail: true
        },
        toInt: true
    }
};

module.exports = bodyData;

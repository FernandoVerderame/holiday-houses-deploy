const authAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(400);
        throw new Error('Non sei un Admin!');
    }
}

module.exports = authAdmin;
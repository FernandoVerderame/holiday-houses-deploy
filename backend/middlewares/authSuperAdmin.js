const authSuperAdmin = (req, res, next) => {
    if (req.user.isSuperAdmin) {
        next();
    } else {
        res.status(400);
        throw new Error('Non sei un Super Admin!');
    }
}

module.exports = authSuperAdmin;
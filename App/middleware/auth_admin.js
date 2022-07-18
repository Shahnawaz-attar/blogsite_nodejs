module.exports = (req, res, next) => {
    if (!req.session.adminId || req.session.role != 'admin') {
        if (req.session.role == 'user') {
            res.redirect('/user');
        } else {
            res.redirect('/login');
        }
    } else {
        next();
    }
}
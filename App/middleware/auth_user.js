module.exports = (req, res, next) => {
    if (!req.session.adminId || req.session.role != 'user') {
        if (req.session.role == 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/login');
        }
    } else {
        next();
    }
}
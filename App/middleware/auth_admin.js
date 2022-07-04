module.exports = (req, res, next) => {
    // console.log(req.session)
    if (!req.session.adminId) {
        res.redirect('/login')
    } else {
        next();
    }
}
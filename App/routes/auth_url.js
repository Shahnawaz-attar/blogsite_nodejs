const auth_controller = require('../controllers/auth.controller')


module.exports = (app)=>{





    app.post('/check_admin',auth_controller.validator.check_admin , auth_controller.check_admin );



    //logout
    app.get('/logout',auth_controller.logout)


}
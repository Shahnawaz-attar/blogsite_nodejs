const auth_controller = require('../controllers/auth.controller')


module.exports = (app)=>{





    app.post('/login',auth_controller.validator.login , auth_controller.login );


    app.post('/user_regis',auth_controller.validator.check_user_reg , auth_controller.user_regis );

    //logout
    app.get('/logout',auth_controller.logout)


}
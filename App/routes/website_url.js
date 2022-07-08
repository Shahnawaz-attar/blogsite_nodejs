module.exports = (app) => {


    const homeController = require('../controllers/home.controller')


    // website routes
    app.get('/', homeController.getHome);


    app.get('/login',(req,res) =>{

        res.render('login');
    })

    app.get('/register',(req,res) =>{

        res.render('register');
    })
    app.get('/post_detail/:id',homeController.get_post_detail)

}
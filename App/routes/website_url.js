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


    app.post('/save_newslatter',homeController.save_newslatter);

    // all_posts
    app.get('/all_posts',homeController.all_posts);

    // /search/:search request is get request by form 

   // get search text from form with get request
    app.get('/search',homeController.search);
 

   


}
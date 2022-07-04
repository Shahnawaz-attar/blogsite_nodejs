
 

module.exports = (app) => {

    require('../controllers/common.controller')(app)
    let redirectLogin =  require('../middleware/auth_admin');
    let post_controller = require('../controllers/post.controller')


    app.get('/admin',redirectLogin,(_,res)=>{

        res.render('dashboard/index');
       
    });

    app.get('/admin/create-post',(_,res)=>{
            
        res.render('dashboard/create-post');
        
    });
    app.post('/admin/save_post',post_controller.save_post);
       
       
      
   



}
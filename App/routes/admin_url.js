
 

module.exports = (app) => {

    let redirectLogin =  require('../middleware/auth_admin');
    let post_controller = require('../controllers/post.controller')


    app.get('/admin',redirectLogin,(_,res)=>{

        res.render('dashboard/index');
       
    });

    app.get('/admin/create-post',redirectLogin,(_,res)=>{
            
        res.render('dashboard/posts/create-post',{post:null});
        
    });
    app.post('/admin/save_post',post_controller.save_post);

    app.get('/admin/post_list',redirectLogin,post_controller.get_posts);

    app.get('/admin/post_edit/:id',redirectLogin,post_controller.get_post);


    app.get('/admin/post_delete/:id',post_controller.delete_post);
       
      
   



}
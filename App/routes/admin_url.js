
 

module.exports = (app) => {

    let redirectLogin =  require('../middleware/auth_admin');
    let post_controller = require('../controllers/post.controller')


    app.get('/admin',redirectLogin,(_,res)=>{

        res.render('dashboard/index');
       
    });

    app.get('/admin/create-post',redirectLogin,(_,res)=>{
            
        res.render('dashboard/posts/create-post');
        
    });
    app.post('/admin/save_post',post_controller.save_post);

    app.get('/admin/post_list',redirectLogin,post_controller.get_posts);

    // app.get('/admin/edit-post/:id',redirectLogin,post_controller.get_post_by_id);


    app.get('/admin/post_delete/:id',post_controller.delete_post);
       
      
   



}
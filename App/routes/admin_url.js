
 

module.exports = (app) => {

    let redirectLogin =  require('../middleware/auth_admin');
    let post_controller = require('../controllers/post.controller')
    let banner_controller = require('../controllers/banner.controller')
    let admin_controller  = require('../controllers/admin.contoller')
    let videos_controller = require('../controllers/videos.controller')


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
       
      
   
    // banner

    app.get('/admin/banner',redirectLogin,(_,res)=>{

        res.render('dashboard/banner/create-banner',{post:null});
       
    });
    app.post('/admin/save_banner',banner_controller.save_banner);
    
    app.get('/admin/banner_list',redirectLogin,banner_controller.get_banners);

    app.get('/admin/banner_edit/:id',redirectLogin,banner_controller.get_banner);
    app.get('/admin/banner_delete/:id',redirectLogin,banner_controller.delete_banner);


    // profile
    app.get('/admin/profile/:id',redirectLogin,admin_controller.get_user_info);
    app.post('/admin/update_profile',admin_controller.update_user_info);


    // newslatter

    app.get('/admin/newslatter',redirectLogin,admin_controller.get_newslatter);

    app.get('/admin/newslatter_delete/:id',admin_controller.newslatter_delete)


    //videos
    app.get('/admin/videos',redirectLogin, videos_controller.create_video);

    //save_video
    app.post('/admin/save_video',videos_controller.save_video);

    app.get('/admin/video_list',redirectLogin,videos_controller.video_list);

    //video_delete
    app.get('/admin/video_delete/:id',redirectLogin,videos_controller.video_delete);

    // video_edit
    app.get('/admin/video_edit/:id',redirectLogin,videos_controller.get_video);


    //Gallery
    app.get('/admin/gallery',redirectLogin,admin_controller.create_gallery);

    //save_gallery
    app.post('/admin/save_gallery',admin_controller.save_gallery);

    // gallery_list
    app.get('/admin/gallery_list',redirectLogin,admin_controller.get_all_gallery);

    //gallery_show
    app.get('/admin/gallery_show/:id',redirectLogin,admin_controller.get_gallery);

    //gallery_delete
    app.get('/admin/gallery_delete/:id',redirectLogin,admin_controller.gallery_delete);

    //images_delete
    app.get('/admin/images_delete/:id',redirectLogin,admin_controller.images_delete);

    // edit_gallery
    app.get('/admin/edit_gallery/:id',redirectLogin,admin_controller.edit_gallery);


        //upload_files

    //create file upload form
    app.get('/admin/upload_files' ,redirectLogin,admin_controller.create_file_upload_form);

    //save_files
    app.post('/admin/save_files',admin_controller.save_files);

}
module.exports = (app) => {

    let redirectLogin = require('../middleware/auth_user');
    let post_controller = require('../controllers/post.controller')
    let banner_controller = require('../controllers/banner.controller')
    let videos_controller = require('../controllers/videos.controller')
    let admin_controller = require('../controllers/admin.contoller')
    app.get('/user', redirectLogin, (req, res) => {

        res.render('dashboard/index')
    })

    // post
    app.get('/user/create-post', redirectLogin, (_, res) => {

        res.render('dashboard/posts/create-post', { post: null });

    });
    app.post('/user/save_post', post_controller.save_post);

    app.get('/user/post_list', redirectLogin, post_controller.get_posts);

    app.get('/user/post_edit/:id', redirectLogin, post_controller.get_post);


    app.get('/user/post_delete/:id', post_controller.delete_post);


    // profile
    app.get('/user/profile/:id', redirectLogin, admin_controller.get_user_info);
    app.post('/user/update_profile', admin_controller.update_user_info);


    //videos
    app.get('/user/videos', redirectLogin, videos_controller.create_video);

    //save_video
    app.post('/user/save_video', videos_controller.save_video);

    app.get('/user/video_list', redirectLogin, videos_controller.video_list);

    //video_delete
    app.get('/user/video_delete/:id', redirectLogin, videos_controller.video_delete);

    // video_edit
    app.get('/user/video_edit/:id', redirectLogin, videos_controller.get_video);

}
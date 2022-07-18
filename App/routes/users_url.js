module.exports = (app) => {

    let redirectLogin = require('../middleware/auth_user');
    let post_controller = require('../controllers/post.controller')
    let banner_controller = require('../controllers/banner.controller')
    let videos_controller = require('../controllers/videos.controller')
    let admin_controller  = require('../controllers/admin.contoller')
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

}
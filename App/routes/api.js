module.exports = (app) => {
    const homeController = require('../controllers/home.controller')


    // get api/blogs
    app.get('/api/blogs',homeController.all_posts_api);

    //add_contact
    app.post('/api/add_contact',homeController.add_contact);




}

module.exports = (app) => {
    const homeController = require('../controllers/home.controller')


    // get api/blogs
    app.get('/api/blogs',homeController.all_posts_api);

    //add_contact
    app.post('/api/add_contact',homeController.add_contact);

    //contact_list
    app.get('/api/contact_list',homeController.contact_list);

    //edit_conacts
    app.get('/api/edit_contact/:id',homeController.edit_contact);

    //contact_delete
    app.get('/api/contact_delete/:id',homeController.contact_delete);

}

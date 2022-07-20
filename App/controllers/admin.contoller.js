const auth_model = require('../models/auth.model');
const upload_files = require('../middleware/upload_files');
const admin_model = require('../models/admin.model')
const gallery_model = require('../models/gallery.model'); 


exports.get_user_info = ((req, resp) => {
    let result = auth_model.getUserById(req.params.id);

    result.then(user => {
        resp.render('dashboard/profile', { user: user })
    }).catch(err => {
        console.log(err);
    })



});

exports.update_user_info = ((req, res) => {

    let uploaded_files = upload_files.upload.single('coverImg')

    uploaded_files(req, res, (err) => {

        if (err) throw err;
        let data = {
            id: req.body.id,
            username: req.body.username,
            email: req.body.email,

        }
        if (req.file) {
            data.coverImg = req.file.filename;
        }

        let result = auth_model.updateUser(data);
        result.then(data => {


            if (data != null) {
                res.send({ status: true, url: '/' + req.session.role + '/profile/' + data.id, msg: 'Update success' });
            } else {
                res.send({ status: false, url: '/' + req.session.role + '/profile/' + data.id, msg: 'fail to updated' })
            }
        }).catch(err => {
            res.send({ status: false, url: '/' + req.session.role + '/profile/' + data.id, msg: 'Something went wrong', })
        })

    })


});

exports.get_newslatter = (req, res) => {

    let get_newslatter = admin_model.get_newslatter()
    get_newslatter.then(data => {
        res.render('dashboard/newsLatter', { data: data })
    })

}

exports.newslatter_delete = (req, res) => {
    admin_model.delete_newslatter(req.params.id).then(post => {
        if (post != null) {
            res.send({ status: true, url: '/admin/newslatter', msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/admin/newslatter', msg: 'fail to Delete' })
        }
    }).catch(err => {
        res.send({ status: true, url: '/admin/newslatter', msg: err })
    })


}


//create_gallery
exports.create_gallery = (req, res) => {
    res.render('dashboard/gallery/create-gallery', { post: null })
}

// save multiple images with title 
exports.save_gallery = (req, res) => {
   
    let uploaded_files = upload_files.upload.fields([{ name: 'coverImg', maxCount: 1 }, { name: 'images', maxCount: 10 }]);

    

    uploaded_files(req, res, (err) => {
            
            if (err) throw err;
            // resize images upload_files.resizeImage
            let images = req.files.images;
            if (images) {
                images.forEach(image => {
                    upload_files.resizeImage(image, 255, 150).then(data => {
                    })
                }
                )
            }

            let data = {
                title: req.body.title,
                images: req.files.images ? req.files.images.map(image => image.filename) : [],
            }
            if (req.files != undefined  && req.files.coverImg) {
                data.coverImg =req.files.coverImg[0].filename;
            }
            // update if id is exist
            let result 
            if (req.body.id != null) {
                data.id = req.body.id;
                result = gallery_model.update_gallery(data);
            }else
            {

                result = gallery_model.save_gallery(data);
            }
            

            result.then(data => {
                if (data != null) {
                    res.send({ status: true, url: '/admin/gallery_list', msg: req.body.id ? 'Update success' : 'Create success' });
                } else {
                    res.send({ status: false, url: '/admin/gallery_list', msg: req.body.id ? 'fail to Update' : 'fail to Create' })
                }
            }
            ).catch(err => {
                res.send({ status: false, url: '/admin/gallery_list', msg: 'Something went wrong', })
            }
            )
            
        })



}

// get all gallery
exports.get_all_gallery = (req, res) => {
    let get_all_gallery = gallery_model.get_all_gallery()
    get_all_gallery.then(data => {
        res.render('dashboard/gallery/gallery_list', { posts: data })
    }).catch(err => {
        console.log(err)
    }
    )
}


//get_gallery
exports.get_gallery = (req, res) => {
    let get_gallery = gallery_model.get_images(req.params.id)
    get_gallery.then(data => {
        res.render('dashboard/gallery/gallery_images', { post: data })
    }).catch(err => {
        console.log(err)
    }
    )
}

//gallery_delete
exports.gallery_delete = (req, res) => {
    let gallery_delete = gallery_model.gallery_delete(req.params.id)
    gallery_delete.then(data => {
        if (data) {
            res.send({ status: true, url: '/admin/gallery_list', msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/admin/gallery_list', msg: 'fail to Delete' })
        }
    }).catch(err => {
        res.send({ status: true, url: '/admin/gallery_list', msg: err })
    }
    )
}

//images_delete
exports.images_delete = (req, res) => {
    let images_delete = gallery_model.images_delete(req.params.id)
    images_delete.then(id => {
        if (id) {
            res.send({ status: true, url: '/admin/gallery_show/'+id, msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/admin/gallery_show/'+id, msg: 'fail to Delete' })
        }
    }).catch(err => {
        res.send({ status: true, url: '/admin/gallery_show/'+id, msg: err })
    }
    )
}

//edit_gallery
exports.edit_gallery = (req, res) => {
    let edit_gallery = gallery_model.get_gallery(req.params.id)
    let get_images = gallery_model.get_images(req.params.id)
    
    Promise.all([edit_gallery, get_images]).then(data => {
        res.render('dashboard/gallery/create-gallery', { post: data[0], images: data[1] })
    }
    ).catch(err => {
        console.log(err)
    }
    )
}

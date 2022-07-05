const upload_file = require('../middleware/upload_files');
const post_model = require('../models/post.model');



exports.save_post =  (req, res) => {


    let upload_file_name = upload_file.upload.single('img');
    upload_file_name(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            let post_data = {
                title: req.body.title,
                description: req.body.description,
                img: req.file.filename
            }
            let result = post_model.create_post(post_data);

            result.then(data => {
                if (data != null) {
                    res.send({ status: true, url: '/admin/create-post', msg: 'successfully created' })
                } else {
                    res.send({ status: false, url: '/admin/create-post', msg: 'fail to create' })
                }
            }).catch(err => {
                res.send({ status: true, url: '/admin/create-post', msg: err })
            })
        }
    }
    )




}



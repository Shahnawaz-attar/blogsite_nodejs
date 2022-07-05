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
                coverImg: req.file.filename
            }
            let result = post_model.create_post(post_data);

            result.then(data => {
                if (data != null) {
                    res.send({ status: true, url: '/admin/post_list', msg: 'successfully created' })
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

exports.get_posts = (req,res)=>{

    let get_posts = post_model.get_posts();
    get_posts.then(post=>{
       
        res.render('dashboard/posts/post_list' , {post:post});
    })

}

exports.delete_post = (req,res)=>{


    let delete_post = post_model.delete_post(req.params.id);

    delete_post.then(post=>{
        if (post != null) {
            res.send({ status: true, url: '/admin/post_list', msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/admin/post_list', msg: 'fail to Delete' })
        }
    })
    
}



const upload_file = require('../middleware/upload_files');
const post_model = require('../models/post.model');



exports.save_post =  (req, res) => {


    let upload_file_name = upload_file.upload.single('img');
    upload_file_name(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.body.id) {
                let update_data = {
                title: req.body.title,
                description: req.body.description,
                postType : req.body.postType,
                };
                update_data.id = req.body.id
                if (req.file) {
                    update_data.coverImg = req.file.filename;
                }
            
                let result = post_model.update_post(update_data);
                result.then(data => {
                
                    if (data != null) {
                        res.send({ status: true, url: '/'+req.session.role+'/post_list', msg: 'Successfully updated' })
                    } else {
                        res.send({ status: false, url: '/'+req.session.role+'/create-post', msg: 'fail to updated' })
                    }
                }).catch(err => {
                    res.send({ status: false, url: '/'+req.session.role+'/create-post', msg: err })
                })


            }else{

           


            let post_data = {
                title: req.body.title,
                description: req.body.description,
                coverImg: req.file.filename,
                postType : req.body.postType,
                created_by: req.session.username,
                role: req.session.role,
            }
            let result = post_model.create_post(post_data);

            result.then(data => {
                
                if (data != null) {
                    res.send({ status: true, url: '/'+req.session.role+'/post_list', msg: 'successfully created' })
                } else {
                    res.send({ status: false, url: '/'+req.session.role+'/create-post', msg: 'fail to create' })
                }
            }).catch(err => {
                res.send({ status: false, url: '/'+req.session.role+'/create-post', msg: err })
            })

        }


        }
    }
    )




}

exports.get_posts = (req,res)=>{

    let get_posts = post_model.get_posts(req.session.username);
    get_posts.then(post=>{
       
        res.render('dashboard/posts/post_list' , {post:post});
    })

}

exports.delete_post = (req,res)=>{


    let delete_post = post_model.delete_post(req.params.id);

    delete_post.then(post=>{
        if (post != null) {
            res.send({ status: true, url: '/'+req.session.role+'/post_list', msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/'+req.session.role+'/post_list', msg: 'fail to Delete' })
        }
    })
    
}

exports.get_post = (req , res)=>{

    let result = post_model.get_post(req.params.id);
    result.then(post=>{
        res.render('dashboard/posts/create-post' ,{post:post});
    })
}



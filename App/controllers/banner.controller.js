
const banner_model = require('../models/banner.model');
const upload_file  = require('../middleware/upload_files')

exports.save_banner = (req,res)=>{

    let upload_file_name =  upload_file.upload.single('img');
   upload_file_name(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
            if(req.body.id){
                let update_data = {
                    title: req.body.title,
                    description: req.body.description,
                    };
                    update_data.id = req.body.id
                    if(req.file != null){
                        update_data.coverImg = req.file.filename;
                    }
                    let result = banner_model.update_post(update_data);
                    result.then(data => {
                    
                        if (data != null) {
                            res.send({ status: true, url: '/admin/banner_list', msg: 'Successfully updated' })
                        } else {
                            res.send({ status: false, url: '/admin/banner', msg: 'fail to updated' })
                        }
                    }).catch(err => {
                        res.send({ status: true, url: '/admin/banner', msg: err })
                    })
            }else{
            

            let post = {
                title: req.body.title,
                description: req.body.description,
                coverImg: req.file.filename,
            }
            let result = banner_model.save_banner(post);
            result.then(post=>{
                if(post != null){
                    res.send({ status: true, url: '/admin/banner_list', msg: 'Successfully updated' })
                }else{
                    res.send({ status: false, url: '/admin/banner', msg: 'fail to updated' })
                }

            }).catch(err=>{
                res.send({ status: true, url: '/admin/banner', msg: err })
            })

        }

        }

   })


}

exports.get_banners = (req,res)=>{
    banner_model.get_banners().then(post=>{
        res.render('dashboard/banner/banner-list',{post:post});
    })

}

exports.delete_banner = (req,res)=>{
    banner_model.delete_banner(req.params.id).then(post=>{
        if (post != null) {
            res.send({ status: true, url: '/admin/banner_list', msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/admin/banner_list', msg: 'fail to Delete' })
        }
    }).catch(err=>{
        res.send({ status: true, url: '/admin/banner_list', msg: err })
    })

    
}

exports.get_banner = (req,res)=>{
    banner_model.get_banner(req.params.id).then(post=>{
        res.render('dashboard/banner/create-banner',{post:post});
    })
}
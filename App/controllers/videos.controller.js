

const videoModel = require('../models/video.model');

exports.create_video = (req,res)=>{
    res.render('dashboard/videos/create-video',{post:null});
}

//save_video
exports.save_video = (req,res)=>{
    

    if(req.body.id){
        console.log(req.body)
        let result = videoModel.updateVideo(req.body.id , req.body);
        result.then(data => {
            if (data != null) {
                res.send({ status: true, url: '/admin/video_list', msg: 'successfully Updated' })
            } else {
                res.send({ status: false, url: '/admin/video_list', msg: 'fail to Update' })
            }
        }).catch(err => {
            res.send({ status: false, url: '/admin/videos', msg: err })
        })

    }else{
       
        let  result = videoModel.create_video(req.body);
        result.then(data => {
                if (data != null) {
                    res.send({ status: true, url: '/admin/video_list', msg: 'successfully created' })
                } else {
                    res.send({ status: false, url: '/admin/video_list', msg: 'fail to create' })
                }
            }).catch(err => {
                res.send({ status: false, url: '/admin/videos', msg: err })
            })
    }

   
}

exports.video_list = (req,res)=>{
    let result = videoModel.get_videos();
    result.then(data => {
            if (data != null) {
                
     

                res.render('dashboard/videos/video-list',{videos:data});
            } else {
                res.render('dashboard/videos/video-list',{videos:null});
            }
        }).catch(err => {
            res.render('dashboard/videos/video-list',{videos:null});
        })
}
//video_delete\

exports.video_delete = (req,res)=>{

    const result =  videoModel.video_delete(req.params.id).then(resp=>{
        if (resp != null) {
            res.send({ status: true, url: '/admin/video_list', msg: 'successfully Delete' })
        } else {
            res.send({ status: false, url: '/admin/video_list', msg: 'fail to Delete' })
        }

    }).catch(err=>{
        console.log(err)
    })

}


exports.get_video=(req,res)=>{
    let result =  videoModel.get_video(req.params.id);

    result.then(post=>{
    res.render('dashboard/videos/create-video',{post:post});
    
    })
}

// create 

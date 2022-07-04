const upload_file = require('../middleware/upload_files');
const post_model = require('../models/post.model');



exports.save_post = (req,res)=>{
    console.log("faesfd")

    // image_file 
    // upload_file.upload.single('img')(req,res,(err)=>{
    //     if(err){
    //         res.send(err)
    //     }

    // })

    
    let post = {
        title : req.body.title,
        description : req.body.description,
        // coverImg : req.file.filename
    
    }
    console.log(post)
    // let result = post_model.create_post(post);

    // result.then(data=>{
    //     if(data !=null){
    //         res.send({status:true,url:'/admin/create-post',msg:'successfully created'})
    //     }else{
    //         res.send({status:false,url:'/admin/create-post',msg:'fail to create'})
    //     }
    // }).catch(err=>{
    //     res.send({status:true,url:'/admin/create-post',msg:err})
    // })
  
}
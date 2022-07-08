const auth_model = require('../models/auth.model');
const upload_files = require('../middleware/upload_files');

exports.get_user_info = ((req,resp)=>{
    let result = auth_model.getUserById(req.params.id);

    result.then(user=>{
        resp.render('dashboard/profile',{user:user})
    }).catch(err=>{
        console.log(err);
    })
  
    

});

exports.update_user_info = ((req,res)=>{

    let uploaded_files= upload_files.upload.single('coverImg')

    uploaded_files(req,res,(err)=>{

        if(err) throw err;
        let data = {
            id:req.body.id,
            username:req.body.username,
            email:req.body.email,
           
        }
        if(req.file){
            data.coverImg = req.file.filename;
        }
        
        let result = auth_model.updateUser(data);
        result.then(data => {

                
            if (data != null) {
                res.send({ status: true, url: '/admin/profile/'+ data.id , msg: 'Update success' });
            } else {
                res.send({ status: false, url: '/admin/profile/'+ data.id, msg: 'fail to updated' })
            }
        }).catch(err => {
            res.send({ status: false, url: '/admin/profile/'+ data.id, msg: 'Something went wrong', })
        })

    })
    

});


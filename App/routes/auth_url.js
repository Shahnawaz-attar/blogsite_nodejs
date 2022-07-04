const bcrypt = require('bcrypt')
var bodyParser = require('body-parser')
const {check , validationResult} = require('express-validator');
const auth_model = require('../models/auth.model');



module.exports = (app)=>{

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.post('/check_admin',
    [
      // check only for not empty
        check('username').not().isEmpty().withMessage('Email/Username is required'),
        check('password').not().isEmpty().withMessage('Password is required')

    ],
    (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.send({success:'fail',errors:errors})
        }else{

            
            let post ={
                username : req.body.username,
                password : req.body.password,
                role     : "admin"

            }
            let result = auth_model.checkUserExist(post);
            result.then(data=>{
               
                if(data !=null){
                    res.send({success:'success',data:data,url:'/admin' , msg : "Welcom '"+data.username+"'"})
                }else{
                    res.send({success:'not_found' , msg : "user not found"})
                }
            }
            ).catch(err=>{
                res.send({success:'fail',err:err})
            }
            )
            


        }
   

    })


}
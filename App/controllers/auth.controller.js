
const {check , validationResult} = require('express-validator');
const auth_model = require('../models/auth.model');
const express = require('express');
const app = express();

exports.check_admin = (req,res)=>{





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
                req.session.adminId = data._id;
                req.session.username = data.username;
                req.session.role = data.role;

                req.app.locals.adminId = data._id;
                req.app.locals.username = data.username;
                req.app.locals.role = data.role;
         

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
}  


exports.validator = {
    check_admin : [
        check('username').not().isEmpty().withMessage('Email/Username is required'),
        check('password').not().isEmpty().withMessage('Password is required')
    ]
    
}



exports.logout = (req,res)=>{

    req.session.destroy();
    delete req.app.locals.adminId;
    delete req.app.locals.username;
    delete req.app.locals.role;

    res.redirect('/login')
}

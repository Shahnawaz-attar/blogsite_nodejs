
const {check , validationResult} = require('express-validator');
const auth_model = require('../models/auth.model');
const express = require('express');
const app = express();

exports.login = (req,res)=>{





    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.send({success:'fail',errors:errors})
    }else{

        
        let post ={
            username : req.body.username,
            password : req.body.password,


        }
        let result = auth_model.checkUserExist(post);
        result.then(data=>{

           
            if(data !=null){
                req.session.adminId = data._id;
                req.session.username = data.username;
                req.session.role = data.role;

           
                res.send({success:'success',data:data,url:'/'+data.role , msg : "Welcom '"+data.username+"'"})
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

exports.user_regis = (req,res)=>{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.send({success:'fail',errors:errors})
    }else{
            
            let post ={
                username : req.body.username,
                password : req.body.password,
                email    : req.body.email,
                role     : "user"
    
            }
            let result = auth_model.user_regis(post);
            result.then(data=>{
                if(data.success == 'fail'){
                    res.send({success:'already_exist',msg:data.msg})
                }
                else{
                    res.send({success:'success',data:data,url:'/login' , msg : "Welcom '"+data.username+"'"})
                }

            }
            ).catch(err=>{
                console.log(err)
                res.send({success:'fail',err:err})
            }
            )

            
            
    }
    

}



exports.validator = {
    login : [
        check('username').not().isEmpty().withMessage('Email/Username is required'),
        check('password').not().isEmpty().withMessage('Password is required')
    ],
    check_user_reg : [
        check('username').not().isEmpty().withMessage('Username is required'),
        check('email').not().isEmpty().withMessage('email is required'),
        check('email').isEmail().withMessage('email is not valid'),
        check('password').not().isEmpty().withMessage('Password is required'),
        check('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),

        check('password').custom((value,{req})=>
        {
            if(value != req.body.confirm_password)
            {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }
        )

            

    ]
    
}



exports.logout = (req,res)=>{

    req.session.destroy();
    delete app.locals.role

    res.redirect('/login')
}

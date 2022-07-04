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
                    req.session.adminId = data._id;
                    req.session.username = data.username;
                    req.session.role = data.role;

                    app.locals.adminId = data._id;
                    app.locals.username = data.username;

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

    //logout
    app.get('/logout',(req,res)=>{

        // req.session.destroy();
        // // delete app.locals.adminId in locals
        // delete app.locals.adminId;
        // delete app.locals.username;
        res.redirect('/login')

    })


}
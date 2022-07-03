const bcrypt = require('bcrypt')
var bodyParser = require('body-parser')
const {check , validationResult} = require('express-validator');



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
            


        }
   

    })


}
let express = require("express");
let app = express();
let path = require("path");
const post_model = require('../models/post.model');

exports.getHome = ((req,resp)=>{

    let result = post_model.get_all_post();
    result.then(data=>{
        resp.render('index',{data:data});
    }).catch(err=>{
        resp.send(err);
    }
    )

    

})
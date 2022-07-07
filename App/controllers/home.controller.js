let express = require("express");
let app = express();
let path = require("path");
const post_model = require('../models/post.model');
const banner_model = require('../models/banner.model')

exports.getHome = ((req,resp)=>{

    let all_post = post_model.get_all_post();
    let banners = banner_model.get_all_banners()
    Promise.all([all_post, banners]).then((result)=>{

        resp.render('index',{data:result[0],banners:result[1]})
    }).catch(err=>{
        resp.send(err);
    }
    )


    

})
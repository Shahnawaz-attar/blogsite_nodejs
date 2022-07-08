let express = require("express");
let app = express();
let path = require("path");
const post_model = require('../models/post.model');
const banner_model = require('../models/banner.model')
const admin_model  = require('../models/admin.model')

exports.getHome = ((req,resp)=>{

    let all_post = post_model.get_all_post();
    let banners = banner_model.get_all_banners();
    Promise.all([all_post, banners]).then((result)=>{

        resp.render('index',{data:result[0],banners:result[1]})
    }).catch(err=>{
        resp.send(err);
    }
    )


    

})

exports.get_post_detail = (req,resp)=>{
    let result = post_model.get_post(req.params.id);
    result.then((post)=>{
        resp.render('post_detail',{post:post})
    }   
    ).catch(err=>{
        resp.send(err);
    }   
    )

   
}
exports.save_newslatter = (req,res)=>{
    let result = admin_model.save_newslatter(req.body);
    result.then(data => {
                
        if (data != null) {
            res.send({ status: true ,msg: 'Thank you for subscribing' })
        } else {
            res.send({ status: false,  msg: 'fail to subscribing' })
        }
    }).catch(err => {
        res.send({ status: true, msg: 'something went wrong' })
    })


}
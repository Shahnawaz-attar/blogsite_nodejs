let express = require("express");
let app = express();
let ejs = require("ejs");
let path = require("path");

exports.Admindata = ((req,resp)=>{

    const data = {
        name:"Shanawaz",
        email:"Shahnawazattar55@gmail.com"
    }

    resp.render('demo',{data:data})
    

})

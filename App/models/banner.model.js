const express = require('express');
const app     = express();
const ObjectId = require('mongoose').Types.ObjectId
const banner_schema = require('../schema/banner.schema');
const fs = require('fs');
const path = require('path');



const save_banner = async (post)=>{
    let post_data = new banner_schema(post)
    let  result = await  post_data.save()
    return result;
    
}


const get_banners = async ()=>{
    let result = await  banner_schema.find();
    return result;

}
const get_banner = async (id)=>{
    let result = await  banner_schema.findById(id);
    return result;

}

const delete_banner = async (id)=>{
    const post = await get_banner(id);
    if(post && post.coverImg !=null && post.coverImg !=''){
        const img_name = post.coverImg;
        const img_path = path.join(__dirname,'../../public/uploads/',img_name);
        if(img_path !='' && img_name!=null && fs.existsSync(img_path)){
            fs.unlink(img_path,(err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    }
    return await banner_schema.deleteOne({_id:ObjectId(id)})
}

const update_post = async (post)=>{
    if(post.coverImg !=null && post.coverImg !=''){
        const old_post = await get_banner(post.id);
        if(old_post){
            const img_name =old_post.coverImg;
            const img_path = path.join(__dirname, '../../public/uploads/',img_name);

            fs.unlink(img_path,(err)=>{
                if(err){
                    console.log(err);
                }
            })
        }

    }

    return await banner_schema.findByIdAndUpdate(post.id,post);

}



module.exports = {
    save_banner,
    get_banners,
    get_banner,
    delete_banner,
    update_post
}
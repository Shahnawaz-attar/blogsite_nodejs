const express = require('express')
const app = express();
const post_schema = require('../schema/post.schema');
const path = require('path')
const fs = require('fs')
const ObjectId = require('mongoose').Types.ObjectId;


const create_post = async (post)=>{
    let post_data = new post_schema(post);
    let result = await post_data.save();
    return result;

}

const get_posts = async ()=>{
    let result = await post_schema.find();
    return result;
}

const delete_post = async (id)=>{
    const post  = await post_schema.findById(id);
    if(post){
        const img_name = post.coverImg;
        const img_path = path.join(__dirname, '../../public/uploads/',img_name);
        fs.unlink(img_path,(err)=>{
            if(err){
                console.log(err);
            }
        }
        )

    }

    return await post.deleteOne({_id:ObjectId(id)})
    

}

const update_post = async (post) =>{

    if(post.coverImg){
        const old_post = await get_post(post.id);
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

    return await post_schema.findByIdAndUpdate(post.id,post);


}

const get_post = async (id)=>{
    const post = await post_schema.findById(id)
    return post ;
}

const get_all_post = async ()=>{
    const get_all_post = await post_schema.find({isActive:1 }).sort({_id:-1}).limit(30);
    return get_all_post;
}

module.exports = {
    create_post,
    get_posts,
    delete_post,
    get_post,
    update_post,
    get_all_post
}
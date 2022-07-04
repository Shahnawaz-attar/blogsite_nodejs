const express = require('express')
const app = express();
const post_schema = require('../schema/post.schema');


const create_post = async (post)=>{
    let post_data = new post_schema(post);
    let result = await post_data.save();
    return result;

}

module.exports = {
    create_post
}
const user = require('../schema/user.schama');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
const fs = require('fs')
const checkUserExist = async (post) => {

    let users = await user.findOne({
        $or: [
            {
                username: post.username
            },
            {
                email:post.username
            }

        ]
    });
    if(users !=null && users.role == 'admin'){
        let match = await bcrypt.compare(post.password, users.password);
        if(match){
            return users;
        }
        return null;
       
    }



}

const getUserById = async (id)=>{
    const userData = await user.findById(id) 
    return userData;

}

const updateUser = async (post)=>{

    if(post.coverImg){
        const old_post = await getUserById(post.id);
        if(old_post && old_post.coverImg !=null && old_post.coverImg !=''){
            const img_name =old_post.coverImg;
            const img_path = path.join(__dirname, '../../public/uploads/',img_name);

            if(img_path != ''){
                fs.unlink(img_path,(err)=>{
                    if(err){
                        console.log(err);
                    }
                })
            }
        }

    }

    return await user.findByIdAndUpdate(post.id,post);


}

module.exports = {
    checkUserExist,
    getUserById,
    updateUser
}

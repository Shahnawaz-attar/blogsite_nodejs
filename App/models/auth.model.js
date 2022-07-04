const user = require('../schema/user.schama');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')

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

module.exports = {
    checkUserExist
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let userSchema = new Schema(
    {

        username: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
        },
        isActive: {
            type: Number,
            default: 0
        },
        created_at :  {
            type: Date,
            default: Date.now
        }
        

    },
    {
        collection: 'users'
    }
)

userSchema.plugin(uniqueValidator,{
    message:'Email is already taken'
});

module.exports = mongoose.model('users',userSchema);
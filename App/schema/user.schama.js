const mongoose = require('mongoose');
const schema = mongoose.schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new schema(
    {

        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
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
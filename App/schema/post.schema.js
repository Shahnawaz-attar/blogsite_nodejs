const mongoose = require('mongoose');
const schema = mongoose.Schema;

let postschema = new schema(
    {
        title:{
            type:String,
            maxlength:100

        },
        description:{
            type:String
        },
        coverImg : {
            type : String
        },
        postType : {
            type : String
        },
        isActive:{
            type:Number,
            default:1
        },
        created_at :{
            type:Date,
            default : Date.now
        },
        created_by :{
            type:String
        },
        role : {
            type:String
        }

    },
    {
        collection: 'posts'
    }
)

module.exports = mongoose.model('posts',postschema);

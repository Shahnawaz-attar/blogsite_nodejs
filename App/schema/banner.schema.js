const mongoose = require('mongoose');
const Schema   = mongoose.Schema


const bannerSchema = new Schema( {
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
    isActive:{
        type:Number,
        default:1
    },
    created_at :{
        type:Date,
        default : Date.now
    }

},
{
    collection: 'banner'
});

module.exports = mongoose.model('banner',bannerSchema)


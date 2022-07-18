const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    link: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type:String,
    },
},
    {
        collection : 'videos'
    }

    
);

const Video = mongoose.model('videos', VideoSchema);
module.exports = Video;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

  } ,
    {
        timestamps: true
    },
    {
        collection: 'gallery'
    }


);

module.exports = mongoose.model('gallery', gallerySchema);
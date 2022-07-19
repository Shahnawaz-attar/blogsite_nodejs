const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create for images
const imagesSchema = new Schema({
    galleryId: {
        type: Schema.Types.ObjectId,
    },
    // multiple images
    images: [{
        type: String,
    }],

});

module.exports = mongoose.model('images', imagesSchema);
    

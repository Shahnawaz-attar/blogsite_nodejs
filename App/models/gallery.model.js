const express = require('express');
const app = express();
const gallerySchema = require('../schema/gallery.schema');
const imagesSchema = require('../schema/images.schema');
const fs = require('fs');
const path = require('path');
const ObjectId = require('mongoose').Types.ObjectId;


//save_gallery
exports.save_gallery = async (post) => {

    let gallery = new gallerySchema(post);
    let result = await gallery.save();
    // save images in imagesSchema

    let images = post.images;
    let images_array = [];
    for (let i = 0; i < images.length; i++) {
        let image = {
            galleryId: result._id,
            images: images[i]
        }
        images_array.push(image);
    }
    let images_result = await imagesSchema.insertMany(images_array);
    if (images_result != null) {
        return true;
    }
    return false;





}

//get_all_gallery
exports.get_all_gallery = async () => {

    let result = await gallerySchema.find({});
    return result;
}


//get_gallery
exports.get_gallery = async (id) => {

    let result = await imagesSchema.find({ galleryId: id });
    return result;
}

//gallery_delete
exports.gallery_delete = async (id) => {
    let result = await gallerySchema.find({ _id: id });

    if (result != null) {

        let get_multiple_images = await imagesSchema.find({ galleryId: id });
        if (get_multiple_images != null) {

            let images = get_multiple_images.map(image => image.images);
            let images_array = images.flat();

            if (images_array.length > 0) {
                for (let i = 0; i < images_array.length; i++) {
                    let image_path = path.join(__dirname, '../../public/uploads/resized/' + images_array[i]);
                    if (fs.existsSync(image_path) && image_path != '') {
                        fs.unlink(image_path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                        )
                    }
                }
            }

        }
        let images_result = await imagesSchema.deleteMany({ galleryId: ObjectId(id) });


        const cover_img = result[0].coverImg;
        const cover_img_path = path.join(__dirname, '../../public/uploads/' + cover_img);
        if (cover_img != '' && fs.existsSync(cover_img_path)) {
            fs.unlink(cover_img_path, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        let result_delete = await gallerySchema.deleteOne({ _id: ObjectId(id) });
        if (result_delete != null ) {
            return true;
        }

    }

}    
//images_delete
exports.images_delete = async (id) => {
    let result = await imagesSchema.find({ _id: id });
    if (result != null) {
        let image_path = path.join(__dirname, '../../public/uploads/resized/' + result[0].images);
        if (fs.existsSync(image_path) && image_path != '') {
            fs.unlink(image_path, (err) => {
                if (err) {
                    console.log(err);
                }
            }
            )
        }
        // return delete_images(id);
        let result_delete = await imagesSchema.deleteOne({ _id: ObjectId(id) });
        if (result_delete != null) {
            return true;
        }
    }
}

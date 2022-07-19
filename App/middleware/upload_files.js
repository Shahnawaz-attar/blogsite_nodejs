
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// resize image then save to folder
const resizeImage = async (file, width, height) => {
   // add to resized 
   await sharp(file.path)
    .resize(width, height)
    .toFile(
        path.resolve( __dirname, '../../public/uploads/resized/', file.originalname)
    );
    
    // delete original image
   const get_image_path = path.resolve( __dirname, '../../public/uploads/', file.originalname);
   if(fs.existsSync(get_image_path)){
       fs.unlink(get_image_path,(err)=>{
           if(err){
               console.log(err);
           }
       }
       )
   }

}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    }
    , filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


var upload = multer({ storage: storage })

module.exports = {
    upload,
    resizeImage
};




 

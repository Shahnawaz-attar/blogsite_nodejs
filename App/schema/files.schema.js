const mongooose = require('mongoose');
const Schema = mongooose.Schema;

const filesSchema = new Schema(
    {
        name: String,
        email: String,
        mobile: String,
        designation: String,

    }
    
    );

 module.exports = mongooose.model('files', filesSchema);   
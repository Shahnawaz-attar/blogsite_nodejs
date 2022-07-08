const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const newslatterSchema = new Schema(

    {
        email: {
            type: String
        }
    },
    {
        collection: 'newslatter'
    })

module.exports = mongoose.model('newslatter',newslatterSchema)    
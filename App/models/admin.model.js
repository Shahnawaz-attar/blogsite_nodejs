const newslatterSchema = require('../schema/newslatter.schema')



const get_newslatter = async ()=>{

        const result = await newslatterSchema.find()
        return result;
}

const save_newslatter = async (post)=>{

    return await new newslatterSchema(post).save()


}
//delete_newslatter
const delete_newslatter = async (id)=>{
    return await newslatterSchema.findByIdAndDelete(id)
}


module.exports = {
    get_newslatter,
    save_newslatter,
    delete_newslatter
}
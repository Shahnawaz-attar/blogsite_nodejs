const newslatterSchema = require('../schema/newslatter.schema')
const filesSchema      = require('../schema/files.schema')
const contactSchema = require('../schema/contact.schema')
const path  = require('path');
const fs = require('fs');



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


//save_files
const save_files = async (post)=>{
        return await filesSchema.insertMany(post)
}


// api section
// save_newslatter
const save_contact = async (post) => {
    return await contactSchema(post).save()
    
}

//get_contact_list
const get_contact_list = async () => {
    return await contactSchema.find()
} 

//get_contact
const get_contact = async (id) => {
    return await contactSchema.findById(id)
}

//update_contact
const update_contact = async (post) => {
    
    if(post.file !=null || post.file != ''){
        let get_record = await contactSchema.findById(post.id);
        if(get_record.file){
            let filename = get_record.file;
            let filepath = path.join(__dirname, '../../public/uploads/'+filename);
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
        

    }

    return await contactSchema.findByIdAndUpdate(post.id, post)

}

//delete_contact
const contact_delete = async (id) => {
    
    const get_record = await contactSchema.findById(id);
    if(get_record.file != null){
        const filename = get_record.file;
        const filepath = path.join(__dirname, '../../public/uploads/'+filename);
        if(fs.existsSync(filepath) && filepath != null){
            fs.unlinkSync(filepath);
        }
    }
    return await contactSchema.findByIdAndDelete(id)

}

module.exports = {
    get_newslatter,
    save_newslatter,
    delete_newslatter,
    save_files,
    save_contact,
    get_contact_list,
    get_contact,
    update_contact,
    contact_delete
}
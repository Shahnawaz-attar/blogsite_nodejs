const VideoSchema  = require('../schema/video.schema');
const ObjectId = require('mongoose').Types.ObjectId;


const create_video = (post)=>{

    const video =  new VideoSchema(post);
    const result = video.save();
    return result;

}


const get_videos = (user)=>{

    if(user != 'admin'){
        return VideoSchema.find({createdBy:user}).sort({isActive:1})
    }
    else{
        return VideoSchema.find({});
    }


}

//video_delete
const video_delete = async(id) =>{
    return await VideoSchema.findByIdAndDelete(id)
}

// get_video
const get_video = async (id)=>{
    return await VideoSchema.findById(id)
}

//updateVideo
const updateVideo = async (id ,post)=>{
    return await VideoSchema.findByIdAndUpdate(id,post)



}

//get_all_videos
const get_all_videos = async ()=>{
    return await VideoSchema.find({isActive:1}).sort({createdAt:-1}).limit(4)
}

module.exports = {
    create_video,
    get_videos,
    video_delete,
    get_video,
    updateVideo,
    get_all_videos
}
const mongoose = require('mongoose')

const newVideo = new mongoose.Schema({
    Video :{
        type :Object,
        url :''
    },
    post :{
         type:mongoose.Schema.Types.ObjectId,
         ref:'post-pinterest'    
    },
},{
    timestamps: true
})

const Video = mongoose.model('post-video-pinterest',newVideo)
module.exports = Video
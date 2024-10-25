const mongoose = require('mongoose')

const newPost = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    descriptionSeCondary:{
        type : String,
        required : true,
        trim : true
    },
    description:{
        type: String,
        trim:true,
        require:true
    },
    price : {
        type: Number,
        trim:true,
        require:true
    },
    priceSecondary : {
        type: Number,
        trim:true,
        require:true
    },
    sales:{
        type: Number,
        trim:true,
        require:true
    },
    totaleOrders:{
        type: Number,
        trim:true,
        require:true
    },
    theRest : {
        type:Number,
        trim:true,
        require:true
    },
    category:{
        type: String,
        trim:true,
        require:true
    }
    ,
    videoUrl :{
        type: String,
        trim:true,
        require:true
    },
    LinkDrive:{
        type: String,
        trim:true,
        require:true
    },
    FreeLinkDrive:{
        type: String,
        trim:true,
        require:true
    }
},{
    timestamps: true,
    toJSON :{virtuals : true},
    toObject :{virtuals : true}
})
newPost.virtual('images',{
    foreignField:'post',
    ref:'post-iamges-pinterest',
    localField:'_id'
})
newPost.virtual('video',{
    foreignField:'post',
    ref:'post-video-pinterest',
    localField:'_id'
})

const Post = mongoose.model('post-pinterest',newPost)
module.exports = Post
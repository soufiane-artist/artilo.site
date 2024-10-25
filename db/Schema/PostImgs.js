const mongoose = require('mongoose')

const newImages = new mongoose.Schema({
    imagePrincipale :{
        type :Object,
        default: {
            url : "",
            publicId:null,
        }
    },
    post :{
         type:mongoose.Schema.Types.ObjectId,
         ref:'post-pinterest'    
    },
    imageSecondary1:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    },
    imageSecondary2:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    },
    imageSecondary3:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    },
    imageSecondary4:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    },
    imageSecondary5:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    },
    imageSecondary6:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    },
},{
    timestamps: true
})

const Imgs = mongoose.model('post-iamges-pinterest',newImages)
module.exports = Imgs
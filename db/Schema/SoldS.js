const mongoose = require('mongoose')

const newSold = new mongoose.Schema({
    title : {
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
    image:{
        type:Object,
        default: {
            url : "",
            publicId:null,
        }
    }
    
},{
    timestamps: true,
    toJSON :{virtuals : true},
    toObject :{virtuals : true}
})


const Sold = mongoose.model('post-pinterest',newSold)
module.exports = Sold
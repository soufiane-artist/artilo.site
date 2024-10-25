const mongoose = require('mongoose')

const newOrder = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    fullname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    postId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post-pinterest'    
   },
   total:{
    type:Number,
    required:true,
    default:0
   }
},{
    timestamps: true,
    toJSON :{virtuals : true},
    toObject :{virtuals : true}
})


const Order = mongoose.model('new-order-pinterest',newOrder)
module.exports = Order
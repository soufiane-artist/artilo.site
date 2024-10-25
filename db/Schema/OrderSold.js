const mongoose = require('mongoose')

const newOrderSold = new mongoose.Schema({
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
   total:{
    type:Number,
    required:true,
    default:0
   }
},{
    timestamps: true,
})


const OrderSold = mongoose.model('new-orderSold-pinterest',newOrderSold)
module.exports = OrderSold
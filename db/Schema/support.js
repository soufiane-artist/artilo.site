const mongoose = require('mongoose')

const newmessage = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    text :{
        type: String,
        required : true
    }
},{
    timestamps: true,
})


const Support = mongoose.model('new-message-pinterest',newmessage)
module.exports = Support
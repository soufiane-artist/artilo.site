const mongoose = require('mongoose')

const newFreefile = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },

    email:{
        type : String,
        required : true
    },
    linkFreefile:{
        type: String,
        required : true,
        trim : true
    }
},{
    timestamps: true,

})


const Freefile = mongoose.model('new-Freefile-pinterest',newFreefile)
module.exports = Freefile
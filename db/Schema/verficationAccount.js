const mongoose = require('mongoose')

//vefyToken Schema 
const vefyTokenSchema = new mongoose.Schema ({
    // احضار صاحب البوسط من قاعدة البيانات
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "new-order-pinterest",
        required : true
    },
    token : {
        type :String,
        required : true,
    },
    //احضار اسم صاحب التعريق بعد الاضافة
},{
    timestamps : true,
});

// verfy token Model

const verrfyTokenModel = mongoose.model("verfytoken-pintesest.com" , vefyTokenSchema);



module.exports ={
    verrfyTokenModel
}
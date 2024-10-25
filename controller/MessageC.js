const Support = require("../db/Schema/support")
const setEmail =require('../utils/sendEmail')

module.exports.newMessage = async(req,res)=>{

    const message = await Support({
        username : req.body.username,
        email : req.body.email,
        text: req.body.text
    })
    await message.save()
    const htmlTemplate = `
    <div>
        <p>username : ${req.body.username} </p>
        <p>email: ${req.body.email} </p>
        <p>text: ${req.body.text} </p>
    </div>
`
//ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
await setEmail("artilo.site@gmail.com", "رسالة جديدة", htmlTemplate);


    res.json({message : "Sent successfully"})
}

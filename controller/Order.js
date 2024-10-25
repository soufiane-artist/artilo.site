const Order = require("../db/Schema/OrderS");
const { verrfyTokenModel } = require("../db/Schema/verficationAccount");
const crypto = require('crypto')
const setEmail = require('../utils/sendEmail');
const Freefile = require("../db/Schema/freeFileS");
const fs = require('fs');
const OrderSold = require("../db/Schema/OrderSold");

/**..................
 * @desc register new User
 * @router /api/auth/register
 * @method POST
 * @access public
..................... */
module.exports.createOrder = (async(req,res)=>{

const {fullname,total,username,email} = req.body

   // check for existing user
    if(!fullname){
        return res.status(400).json({ message : 'الرجا�� ��دخال الا��م الكامل'});
    }
    if(!username){
        return res.status(400).json({ message : 'الرجا�� ��دخال ا��م المستخدم'});
    }
    if(!email){
        return res.status(400).json({ message : 'الرجا�� ��دخال البريد ال��لكتروني'});
    }

    // check for existing user
    const order = await Order({
        username,
        fullname,
        email,
        total,
        postId : req.params.postId
    })
    await order.save()
    
    // send verification email
      
     const verifytoken = new verrfyTokenModel({
          orderId : order._id,
          //يكتب كتابة عشوائية
          token : crypto.randomBytes(32).toString("hex"),
      });
      await verifytoken.save()
   
      const link = req.body.LinkDrive;
      //انشاءاتشتيميل لتكون احلى
      const htmlTemplate = `
           <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Thank You for Your Purchase!</h2>
        <p>We're thrilled to have you as a customer. Please click the link below to download your purchased file:</p>
        <a href="${link}" style="color: #0066cc; text-decoration: none; font-weight: bold;">Download Your File</a>
        <p>If you have any questions, feel free to reach out. Enjoy your new product!</p>
        <p>Best Regards,<br>Artilo.site</p>
    </div>
      `
      //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
      await setEmail(req.body.email, "Your Purchase is Confirmed", htmlTemplate);
      //انشاءاتشتيميل لتكون احلى
      const htmlTemplate2 = `
          <div>
              <p>  هناك طلبية جديدة بمبلغ ${total} دولار </p>
          </div>
      `
      //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
      await setEmail("artilo.site@gmail.com", "طلبية جديدة", htmlTemplate2);
     res.json({order: order,token:verifytoken})
    })
/**..................
 * @desc verfify token
 * @router /api/auth/register
 * @method POST
 * @access public
..................*/

  module.exports.verfyTokenOrder = (async (req, res) => {
    //من الرابط جلب اليوزر
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        return res.json({ message: 'order not found ' });
    }
    //التاكد من التوكن هل هو صحيح جلب التوكن من الرابط
    const verifycationToken = await verrfyTokenModel.findOne({
        orderId: order._id,
        token: req.params.token
    });
    //ادا لم يكن لدينا
    if (!verifycationToken) {
        return res.json({ messagv: 'token not found' });
    }
    // romove token
    res.json({data:order , message: 'Check your email' })
});

/**..................
 * @desc get all orders 
 * @router /api/auth/register
 * @method GET
 * @access public
..................*/
module.exports.getAllOrders =async(req,res)=>{
    const orders = await Order.find().sort({ createdAt: -1 })
    const prodersProject = orders.map(order =>{
        return {
            _id : order._id,
            username : order.username,
            fullname : order.fullname,
            email : order.email,
            total : order.total,
            postId : order.postId,
            createdAt : order.createdAt
        }
    })
    res.json(prodersProject)
}
/**..................
 * @desc get all orders 
 * @router /api/auth/register
 * @method DELETE
 * @access public
..................*/

module.exports.deleteAllOrders = async(req,res)=>{
    await Order.deleteMany()
    res.json({message : 'تم حذف ��ميع الطلبات'})
}

/**..................
 * @desc get free file
 * @router /api/auth/getfile
 * @method POST
 * @access public
..................*/
module.exports.createrequest = (async(req,res)=>{
    const {username,email,linkFreefile} = req.body
        if(!username){
            return res.status(400).json({ message : 'الرجا�� ��دخال ا��م المستخدم'});
        }
        if(!email){
            return res.status(400).json({ message : 'الرجا�� ��دخال البريد ال��لكتروني'});
        }
        // check for existing user
        const order = await Freefile({
            username,
            email,
            linkFreefile,
        })
        await order.save()
        
          const link = linkFreefile;
          //انشاءاتشتيميل لتكون احلى
          const htmlTemplate = `
              <div>
                    <p>Click to download the link below</p>
                    <a href="${link}">Download Link</a>
              </div>
          `
          //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
          await setEmail(req.body.email, "Free file 🖼️🎨", htmlTemplate);
          res.json({ message: 'Check your email. If you don\'t find the email in your inbox, please check your spam or junk folder.' });
        })
        //

        module.exports.createOrderSold = (async(req,res)=>{

            const {fullname,total,username,email} = req.body
            
               // check for existing user
                if(!fullname){
                    return res.status(400).json({ message : 'الرجا�� ��دخال الا��م الكامل'});
                }
                if(!username){
                    return res.status(400).json({ message : 'الرجا�� ��دخال ا��م المستخدم'});
                }
                if(!email){
                    return res.status(400).json({ message : 'الرجا�� ��دخال البريد ال��لكتروني'});
                }
            
                // check for existing user
                const order = await OrderSold({
                    username,
                    fullname,
                    email,
                    total,
                })
                await order.save()
                
                // send verification email
                  
                 const verifytoken = new verrfyTokenModel({
                      orderId : order._id,
                      //يكتب كتابة عشوائية
                      token : crypto.randomBytes(32).toString("hex"),
                  });
                  await verifytoken.save()
               
                  const link = req.body.LinkDrive;
                  //انشاءاتشتيميل لتكون احلى
                  const htmlTemplate = `
                       <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Thank You for Your Purchase!</h2>
                    <p>We're thrilled to have you as a customer. Please click the link below to download your purchased file:</p>
                    <a href="${link}" style="color: #0066cc; text-decoration: none; font-weight: bold;">Download Your File</a>
                    <p>If you have any questions, feel free to reach out. Enjoy your new product!</p>
                    <p>Best Regards,<br>Artilo.site</p>
                </div>
                  `
                  //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
                  await setEmail(req.body.email, "Your Purchase is Confirmed", htmlTemplate);
                  //انشاءاتشتيميل لتكون احلى
                  const htmlTemplate2 = `
                      <div>
                          <p>  هناك طلبية جديدة بمبلغ ${total} دولار </p>
                      </div>
                  `
                  //ارسال البيانات الى قسم سيند ايمايل حسب الترتيب
                  await setEmail("artilo.site@gmail.com", "طلبية جديدة", htmlTemplate2);
                 res.json({order: order,token:verifytoken})
                })
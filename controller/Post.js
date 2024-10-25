const Imgs = require("../db/Schema/PostImgs");
const Video = require("../db/Schema/PostVideo");
const Post = require("../db/Schema/postS")
const path = require('path');
const { cloudinaryUploadeImage } = require("../utils/Cloudinary");
// create post
exports.CreateNewPost =async (req,res)=>{
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        descriptionSeCondary:req.body.descriptionSeCondary,
        description:req.body.description,
        price: req.body.price,
        priceSecondary:req.body.priceSecondary,
        sales: req.body.sales,
        totaleOrders :req.body.totaleOrders,
        theRest : req.body.theRest,
        category : req.body.category,
        videoUrl : req.body.videoUrl,
        LinkDrive : req.body.LinkDrive,
        FreeLinkDrive : req.body.FreeLinkDrive
    })
    await post.save()
    res.json(post)
}
//get post by id
exports.getPost =async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('video').populate('images')
    res.json(post)
}
//get all posts
exports.getAllPosts =async (req,res)=>{
    const posts = await Post.find().populate('video').populate('images').sort({ createdAt: -1 })
    res.json(posts)
}
//create video 
exports.createVideo = async(req,res)=>{
    // post Id
    const post = await Post.findById(req.params.Postid)
    if(!post){
        return res.json({message : 'post id not found'})
    }
    const video = new Video({
        Video : req.body.Video,
        post : post._id
    })
    await video.save()
    res.json(video)
}
//
// create images
   // const result = await cloudinaryUploadeImage(imagePath)


   const cloudinary = require('cloudinary')

   // تهيئة مكتبة Cloudinary باستخدام المتغيرات المحددة من process.env
   cloudinary.config({
       cloud_name: "dktyi1hnl", // اسم السحابة
       api_key : 317962974299128 , // مفتاح API
       api_secret : "HTNkrbrsDwFedHjeXKuHCR96crM" // سر API
   })

   exports.createImagePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post id not found' });
        }

        if (!req.files || req.files.length < 7) {
            return res.status(400).json({ message: 'Please upload exactly 7 images.' });
        }

        // رفع الصور إلى Cloudinary
        const uploadPromises = req.files.map(file => {
            return cloudinary.uploader.upload(file.path, { folder: 'your_folder_name' });
        });

        // انتظر رفع جميع الصور
        const uploadedImages = await Promise.all(uploadPromises);

        // حفظ المسارات لكل صورة
        const imagePaths = uploadedImages.map(upload => ({
            url: upload.secure_url,
            publicId: upload.public_id
        }));

        const postImages = new Imgs({
            imagePrincipale: imagePaths[0], // الصورة الرئيسية
            imageSecondary1: imagePaths[1],
            imageSecondary2: imagePaths[2],
            imageSecondary3: imagePaths[3],
            imageSecondary4: imagePaths[4],
            imageSecondary5: imagePaths[5],
            imageSecondary6: imagePaths[6],
            post: post._id
        });

        await postImages.save();
        res.status(201).json(postImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// delete all posts 

    exports.deleteAllPosts = async (req, res) => {
        try {
            await Post.deleteMany({});
            res.json({ message: 'All posts deleted.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    module.exports.deletePostById = async(req,res)=>{
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.json({message : 'post id not found'})
        }
        res.json({message : "post delected"})
    }
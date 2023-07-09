import express from 'express';
import {v2 as cloudinary} from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();
import Post from '../mongodb/models/Post.js';

const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// to get the data...
router.route('/').get(async (req,res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json({success: true,data: posts});
    }
    catch(err){
        res.status(500).json({success: false,message: err.message});
    }
})
// to post the data...
router.route('/').post(async(req,res)=>{
    try{
        console.log("INTO THE POST ROUTES");
        const {name,prompt,photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        // we get that url and save into the database 
        const newPost = new Post({
            name,
            prompt,
            photo: photoUrl.url,
        });
        await newPost.save();
        console.log("UPLOAD SUCCESSFULL");
        console.log(newPost);
        res.status(200).json({success: true,data:newPost});
    }
    catch(error){
        res.status(500).json({success: false,message:error.message});
    }
})

export default router;

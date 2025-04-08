import express from "express";
import {addCommentController, allUserData, blogData, blogEdit, deleteBlogController, generateOTP, getCommentController, getUserData, loginController, mailVerificationController, signupController, uploadBlogImageController, uploadFileController, verifyOtpController} from "../Controller/user.controller.js"
import asyncHandler from "../Utils/asyncHandler.js";
import authChecker from "../Middlewares/authChecker.js";
import { storage } from "../Services/multer.js";
import multer from "multer";



export const Route = express.Router()

Route.post("/signup", asyncHandler(signupController));

Route.get("/mailVerification/:id/:mailToken", asyncHandler(mailVerificationController));

Route.post("/login", asyncHandler(loginController));

Route.post("/otpSend", authChecker, asyncHandler(generateOTP));

Route.post("/verifyOtp", asyncHandler(verifyOtpController));

Route.get("/getUserData/:id", authChecker, asyncHandler(getUserData));

Route.post("/blogData/:id", asyncHandler(blogData));

Route.put("/blogEdit/:id", asyncHandler(blogEdit));

Route.get("/allUserData", asyncHandler(allUserData));

Route.post("/addComment/:userId/:blogId", asyncHandler(addCommentController))

Route.get("/getComment/:blogId", asyncHandler(getCommentController))

Route.delete("/deleteBlog/:id", asyncHandler(deleteBlogController))

const upload = multer({storage, limits: {fileSize: 1024 * 1024 * 5 } }); // equals 5mb

Route.post("/uploadProfile/:id", upload.single("file"), asyncHandler(uploadFileController))

Route.post("/uploadBlogImage/:id", upload.single("file"), asyncHandler(uploadBlogImageController))

Route.post("/logOut", asyncHandler(loginController))





// import { storage } from "../Services/multer.js";
// import multer from "multer";
// import { User } from "../Models/user.models.js";


// const upload = multer({storage, limits: {fileSize: 1024 * 1024 * 5 } }); // equals 5mb

// Route.post("/upload",upload.single("file"), async (req, res, file) => {
//     console.log(req.file);
//     const {id} = req.params;
//     const  user = await User.findById(id);
//     user.profilePic = req.file.path;
//     await user.save();
//     res.json({ message:"File uploaded Successfully",
//         profilePath: req.file.path,
//     });
    
// })
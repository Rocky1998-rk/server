import { User} from "../Models/user.models.js";
import Blog from "../Models/blogs.models.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../Services/nodemailer.js";
import { signupVerificationMail } from "../mailTemplate/signupMail.js";
import crypto from "crypto";
import { otpSendMail } from "../mailTemplate/signupMail.js";
import customError from "../Utils/errorHandle.js";
import jwt from "jsonwebtoken";



const signupController = async (req , res) => {

        const {name, email, password, category} = req.body
        
        if (!name || !email || !password || !category) {
          throw new customError(400, "All fields are required");             
        }
        const existingUser = await User.find({email});
        if (existingUser.length > 0) {
            throw new customError(400, "Email already in Use");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const mailToken = crypto.randomBytes(12).toString("hex");
        const user = new User({
            name,
            email,
            password:hashedPassword,
            category,
            mailToken,
        });

        await user.save();
        const signedUpUser = await User.findOne({email});
        const id = signedUpUser._id.toString();
        const savedMailToken = signedUpUser.mailToken;
         console.log("user", signedUpUser, "user details:-","userId:", id,"userToken:", savedMailToken)
       
        const subject = "Verification Email from Blog India";

        sendEmail(email, subject, signupVerificationMail.replace(
            "{verification_link}",`http://localhost:3000/api/mailVerification/${id}/${mailToken}`
        )
    );
        res.status(201).json({message:"User Signed Up SuccessFully"});
     
};



//////////////// Email Verified Api ////////////


const mailVerificationController = async (req, res) => {
    try {
        const {id, mailToken} = req.params;

        const user = await User.findById(id);
        if(!user){
            throw new customError(404, "User not found");
        }

        const savedToken = user.mailToken;
        if(mailToken !== savedToken){
            throw new customError(401, "invalid mail Verification");
        }

        user.isMailVerified = true;
        user.mailToken = null;
        await user.save();
        
        res.redirect("http://localhost:5173/mailSuccessVerified");
        
    } catch (error) {
        throw new customError(401, {redirectUrl: "http://localhost:5173/mailNotVerified"});
    }
}


/////////// Login Controller/////////


const loginController = async (req, res) => {
    

        const {email, password} = req.body;
        console.log("Email:", email, "Password:", password);

        if(!email || !password){
            throw new customError(400, "All fields are required")
        }

        const existingUser = await User.findOne({email});

        if(existingUser.email !== email){
            throw new customError(401, ("incorrect Email"))
        }

        const result = await bcrypt.compare(password, existingUser.password);
        console.log("result:", result);

        if(!result){
            throw new customError(401, "incorrect Password")
        }

        const token = jwt.sign({name:existingUser.name, id:existingUser._id},"Rocky", {expiresIn : "3h"});
        res.setHeader("authorization",`Bearer ${token}`);

        // res.cookie("jwt", token);

        res.status(200).json({message:"Successfully logged In"})
        
}



/////////// GenerateOTP API Controller //////////


const generateOTP = async (req , res) => {

    const { email } = req.body;
    const { name, id } = req.existingUser;
   
       if (!email){
        // return res.status(400).json({message: "Email is required"})
           throw new customError(400, "Email is required");
       }

       const existingUser = await User.findOne({email})
       
       if(!existingUser){
           // return res.status(404).json({message: "User not found"})
           throw new customError(404, "User not found");
       }

       const otp = Math.floor(100000 + Math.random() * 900000)
       console.log("OTP:", otp)
           existingUser.otp = otp
          await existingUser.save();

          sendEmail(email,"password reset OTP", otpSendMail.replace("{OTP}", otp.toString()));
        //   res.send(`Welcome ${name} your id is ${id}`);
          res.status(200).json({status:"success", message: "OTP sent successfully" });
    
}


/////////// Verify OTP Controller /////////


const verifyOtpController = async ( req, res) => {
   
        const {otp, email} = req.body

        console.log("entered otp", otp, "user email",email);
        if(!otp){
            // return res.status(400).json({message:"All fields are required"});
            throw new customError(400, "All fields are required");
        }

        const user = await User.findOne({email});

        if(user.otp !== otp){
            // return res.status(401).json({message: "incorrect OTP"});
            throw new customError(404, "incorrect OTP")
        }
        user.otp = undefined;
        await user.save();

        res.status(200).json({message:"OTP verify successfully"});

}


//////// Get User Data Controller ////////


const getUserData = async (req, res) => {

        const {id} = req.params
        console.log("existingId", id)

         const existingUser = await User.findById(id).populate("createBlogs")
         console.log("User Data:", existingUser)

       if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }
       return res.status(200).json({ message: "User Data successfully",  existingUser:existingUser});

    }


    
    ////////// BlogData Controller ///////////


const blogData = async (req, res) => {

        const { title, category, content } = req.body;
        const authorId = req.params.id
        // console.log("Author Id:", authorId)
        const newBlog = new Blog({ title, category, content, author:authorId});
        // console.log("Blog Id:", newBlog._id)

        await newBlog.save();

        const user = await User.findByIdAndUpdate(authorId, {$push : { createBlogs : newBlog._id }})
        
        res.status(201).json({message:"Data  Saved Successfully", blog: newBlog});

      } ;


///////// Blog Edit Controller /////////

      const blogEdit = async (req, res) => {
            const {id} = req.params
            const {title, content, category} = req.body
            const updatedBlog = await Blog.findByIdAndUpdate(id,{
                title,
                content,
                category,
            },);
            if (!updatedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }

          res.status(200).json({message:"Blog Content Updated Successfully", updatedBlog})
      }




///////////////// All User Data ///////////

        const allUserData = async (req, res) => {
              
            const allUsers = await User.find().populate("createBlogs");
            res.status(200).json({message: "All User Data Loaded Successfully", allUsers: allUsers})

            // res.status(500).json({ message: "Server Error", error: error.message });

        }


//////// Add Comments //////

        const addCommentController = async (req, res) => {

          const {userId, blogId} = req.params
          const{comment} = req.body;
          if(!comment){
            throw new customError(400,"All fields are required");

          }
          const user = await User.findById(userId);

          if (!user) {
            throw new customError(400,"User Not Found");
          }
          const blog = await Blog.findById(blogId);
          
          if (!blog) {
            throw new customError(400,"Blog Not Found");
          }

          blog.comments.push({ user:userId,comment });

          await blog.save();
          
          res.status(200).json({message:"Comment Added Successfully"})
        }


        //////// Get Comments ///////



        const getCommentController = async (req, res) => {

                const {blogId} = req.params
                const blog = await Blog.findById(blogId).populate({ path: "comments", populate: { path: "user", select: "name profilePic"}})
                console.log(blog)

                if (!blog) {
                    return res.status(404).json({ error: "Blog not found" });
                }
                res.json({ comments: blog.comments });

                // res.status(500).json({ message: "Server Error", error: error.message });
           
        }



///////// Upload ProfileFile  ////////


const uploadFileController = async (req, res, file) => {
            console.log(req.file);
            const {id} = req.params;
            const  user = await User.findById(id);
            user.profilePic = req.file.path;
            await user.save();


            res.json({ message:"File uploaded Successfully",
                profilePic: req.file.path,
            });
            
        }




//////// Upload Blog Image Controller //////////


const uploadBlogImageController = async (req, res, file) => {
       console.log("file", req.file);
       const {id} = req.params;
       const blog = await Blog.findById(id)
       blog.blogImagePath = req.file.path;
       await blog.save();
       res.json({ message:"Blog File uploaded Successfully", blogImagePath:req.file.path});
    

}





//////// Delete Blog Controller ///////////

const deleteBlogController = async (req, res) => {

    const { id }  = req.params

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await User.findByIdAndUpdate(blog.userId, {
      $pull: { createBlogs: id }
    });

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully',});
  
}




//////// LogOut Controller ///////

const logOutController = async () => {

       




}



export {signupController, mailVerificationController, loginController, generateOTP, verifyOtpController, getUserData, blogData, blogEdit, allUserData, addCommentController, getCommentController,uploadFileController,uploadBlogImageController, deleteBlogController,logOutController}
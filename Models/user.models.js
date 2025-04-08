import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose .Schema(
    {
        name:{
            type:String,
            required:[true,"name is a required field"],
        },

        email:{
            type:String,
            required:[true,"email is a required field"],
            unique:true,
        },

        password:{
            type:String,
            required:[true,"password is a required field"],
            unique:true,
        },

        category:{
            type:String,
            required:[true,"category is a required field"]
        },

        isMailVerified:{
            type:Boolean,
            default:false,
        },

        mailToken:{
            type:String,
            default:null,
        },

        otp:{
            type:String,
            default:null
        },

        createBlogs:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Blog"
        },

        profilePic:{
            type:String,
            default:"",
        }
 
    },

    {timestamps:true}

)

export const User = mongoose.model("User", userSchema);
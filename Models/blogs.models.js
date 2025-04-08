import mongoose from "mongoose"

const blogSchema = mongoose.Schema(

    {
        title: {
            type:String,
            required:true
        },

        category:{
            type:String,
            required:true,
        },

        content: {
            type:String,
            required:true
        },

        author: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },

        comments: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
            comment:String,
            createdAt: {
                type:Date,
                default:Date.now,
            }
        }, 
    ],

    
    blogImagePath:{
        type:String,
        default:"",
    },

},

    {timestamps:true}


);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
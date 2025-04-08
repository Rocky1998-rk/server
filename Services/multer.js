// import multer from "multer"


// export const storage = multer.diskStorage({

//  destination:function(req, file, cb){
//     cb(null, "./Public/profile");
//  },

//  filename: function (req, file, cb){
//     cb(null, `${Date.now()}${file.originalname}`);
//  },
// });



import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";

cloudinary. config({
cloud_name:"dszadvuz6",
api_key:"856631586458974",
api_secret:"bpCyU5RUUqYYXKBb5Q83SmJR1o0",

})

export const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params:{
    
    folder:"blog",
    format: async ( req,file ) => {
        const allowedFormats = ["jpg", "jpeg", "png"];
        if (!allowedFormats.includes(file.mimetype.split("/")[1])) {
            throw new Error("Unsupported file format");
        }else{
            return file.mimetype.split("/")[1];
        }

    },

    public_id:(req,file) =>`${Date.now()}${file.originalname.split(".")[0]}`


}

})
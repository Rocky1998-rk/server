import customError from "../Utils/errorHandle.js";
import jwt from "jsonwebtoken";

const authChecker = async(req, res, next) => {
//     try {
//          const token = req.cookies.jwt;
//          console.log(token)

//         if (!token) {
//             throw new customError(401, "invalid token");
//         }

//         const decoded = jwt.verify(token, "Rocky");

//         if (!decoded) {
//             throw new customError(401, "invalid token");
            
//         }

//         console.log("user:", decoded);
//         req.existingUser = decoded

//         next();
        
//     } catch (error) {
//         console.error(error.message);
//         next(error.message)
        
//     }


try {
    const token = req.headers.authorization?.split("Bearer ")[1]
    console.log(token);

    if (!token) {
        throw new customError(401, "invalid token");  
    }

    const decoded = jwt.verify(token, "Rocky");

    if (!decoded) {
        throw new customError(401, "invalid token");
    }
    
    console.log("user:", decoded);

     req.existingUserId = decoded.id;
     
     next();

} catch (error) {
    console.log(error.message);
}

};

export default authChecker;
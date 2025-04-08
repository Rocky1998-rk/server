import express from "express"
import {dbConnect} from "./Database/db.js"
import cors from "cors"
import env from "dotenv"
import { Route } from "./Routes/user.routes.js";
import cookieParser from "cookie-parser";
 

env.config();

const app =  express();
app.use(cookieParser());

const PORT = process.env.PORT || 5000 ;

( async () => {
    await dbConnect();
     app.listen(PORT,() =>{
        console.log("server is running on port", PORT);

     });
})();


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    exposedHeaders:["Authorization"],

}));


app.use(express.json());

app.use("/api", Route);




app.use((err, req, res, next) => {
     const { statusCode, message } = err;

     if(statusCode || message){
          res.status(statusCode || 500).json({message});
     }else{
          res.status(500).json({message: "server error"});
     }
     console.log("Status:", statusCode, "error:", message);
});







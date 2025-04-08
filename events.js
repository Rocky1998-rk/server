// import events from "events";
// import http from "http";

// const entry = new events.EventEmitter();

// entry.on("signin", () => {
//     console.log("User Signed In");
// });

// entry.on("signin", () => {
//     console.log("Saved Data in DataBase");
// });

//   const Server = http.createServer((req, res) => {
//     if (req.url === "/signin") {
//         entry.emit("signin");
//         res.end("server running"); 
//     }else{
//         res.end("server Error")
//     }
// })

// Server.listen(5000);









  import events from "events";
  import express from "express"

    const entry = new events.EventEmitter();
    const app =  express();


        entry.on("signin", () => {
        console.log("User Signed In");
    });
    
         entry.on("signin", () => {
         console.log("Saved Data in DataBase");
     });
   
     app.get("/signin", (req, res) => {
            entry.emit("signin");
            res.send("server running"); 
     })
      
     app.use((req, res) => {
      res.status(404).send("Server Error");
    });


  const PORT = 5000;
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});











// import cluster from 'node:cluster';
// import http from 'node:http';
// import { availableParallelism } from 'node:os';
// import process from 'node:process';

// const numCPUs = availableParallelism();

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);
  

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

// } else {
 
//   http.createServer((req, res) => {
//     res.end(`Worker ${process.pid} started`)

//   }).listen(8000);


//   console.log(`Worker ${process.pid} started`);
// }





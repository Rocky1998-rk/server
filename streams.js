import fs from "fs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import status from "express-status-monitor";


const App = express();

App.use(status());

const __fileName = fileURLToPath(import.meta.url);

App.get("/", (req, res) => {
    const Stream = path.join(path.dirname(__fileName),"largeFile.txt");

    const ReadStream = fs.createReadStream(Stream);
    ReadStream.pipe(res);
    ReadStream.on("error", (err) => {
    console.log(err);

    });

});

App.listen(5000);




for (let i=0; i <= 1000000; i++){
    fs.appendFileSync("largeFile.txt", "hello World \n", () => {});
};



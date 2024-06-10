import express from "express";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();
const app = express();
app.use(express.static("frontend"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port = 80;

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/Frontend/src/html/home.html");
});

app.get("/guest", (req, res)=>{
    res.sendFile(__dirname + "/Frontend/src/html/guestBook.html");
});

app.get("/map", (req,res)=>{
    res.sendFile(__dirname + "/Frontend/src/html/map.html");
});

app.get("/comment", (req, res)=>{
    const db = JSON.parse(fs.readFileSync("DB.json"));
    res.json(db);
});

app.listen(port, ()=>{
    console.log(`server is listening at localhost:80`);
});

app.post("/createcomment",(req,res)=>{
    const data = req.body;
    console.log(data);

    const db = JSON.parse(fs.readFileSync("DB.json"));
    db.commentList.unshift(data);
    fs.writeFileSync("DB.json", JSON.stringify(db));
    res.json(data);
});


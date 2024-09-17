const express = require("express");
const fs = require("fs");
const port = 3000;

const app = express();
let datas;

app.get('/dashboard',(req,res) => {
    const search = req.query;
    //const s1 = req.params.id;
    console.log(search);
   // console.log(s1);
    res.send("Helloworld");
});
app.get('/dash',(req,res) => {
    const read = fs.createReadStream("./newfile.txt");
    const write = fs.createWriteStream("./newdata.txt");
    read.pipe(write);
    read.on('data',(chunk) => {
        datas = chunk.toString();
        console.log(datas);
    });
    read.on('end',() => {
        console.log("no more data");
    });
    res.send("data send to it");
    res.end();
})
app.get('/',(req,res) => {
    if(fs.existsSync("./newdata.txt"))
        console.log("File exist");
    else{
        fs.writeFileSync("./newdata.txt","its new file");
        console.log("File not exist");
    }
    fs.unlinkSync("./newdata.txt");
    console.log("File deleted successfully");
    res.redirect('/dashboard');
});


app.use((req, res, next) => {
    res.send('Error: Route not found');
    next();
});

app.listen(port,() => {
    console.log(`server at http://localhost:${port}`);
});
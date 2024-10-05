const express = require("express");
const ejs = require("ejs");
//const http = require("http");
const events = require("events");
const fs = require("fs");
const { Stream } = require("stream");
const port = 3000;

const ev = new events.EventEmitter();
const app = express();
app.set("view engine","ejs");
/*
http.createServer( (req,res) => {
    if(req.method == GET){

    }
}).listen(port,() => {
    console.log(`server at http://localhost:${port}`);
});*/
app.locals.myname = "noopura";
app.locals.title = "homessss";
app.get('/',(req,res) =>{
    res.render('newfil');

});

function access(req,res,next){
    let datas = req.query;
    console.log(datas);
    next();
}
function handler(){
    console.log("fired");
}
app.get('/dash',(req,res) =>{
    ev.on("scream",handler);
    ev.emit('scream');
    res.locals.myname = "anoop";
    res.render('newfil');
});
app.get('/new/:id', (req,res) =>{
   res.send("ok");
});
app.use((err,req,res,next) =>{
    console.log(err);
    res.send("error occured");
    next();
})
app.listen(port,() => {
    console.log(`server at http://localhost:${port}`);
});
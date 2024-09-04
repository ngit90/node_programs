const express = require("express");
const port = 3000;

const app = express();

app.get('/dashboard',(req,res) => {
    res.send("Helloworld");
});

app.get('/',(req,res) => {
    res.redirect('/dashboard');
});

app.use((req, res, next) => {
    res.send('Error: Route not found');
});

app.listen(port,() => {
    console.log(`server at http://localhost:${port}`);
});
const express = require('express');

const app = express();
const port = 3002;


app.get('/',(req,res) =>{
    res.send("its ok");

});

app.listen(port,() =>{
    console.log(`server at http://localhost:${port}`);
});
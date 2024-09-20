const express = require("express");
const app =express();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");

const url = 'mongodb://localhost:27017';
const dbName = 'sampleapp';
let db, collection;

async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(url, {});
        db = client.db(dbName);
        collection = db.collection('sampledata');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
    }
}
connectToMongoDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
}
  
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}
app.get('/dash', (req,res) => {
    if(fs.existsSync("./new.txt"))
        console.log("yes it is here");
    else
    {
        fs.writeFileSync("new.txt","its my file");
        console.log("file created");
    }
    //fs.unlinkSync("./new.txt");
    //fs.rmdirSync("./one");
    const read = fs.createReadStream("./new2.txt",{encoding: 'utf8'});
    read.on('data',(chunk) => {
        console.log(chunk);
    });
    const write = fs.createWriteStream("./new.txt");
   read.pipe(write);
    write.on('finish', () => {
        console.log('Writing completed.');
      });
   

    res.send("ok");
});
app.get('/dashboard:id', (req,res) => {
    const search = req.params.id;
    console.log(search);
    res.send("its fine");
});
app.get('/', async (req,res) => {
    const users = await collection.find().toArray();
    res.render("index",{ title : "newpage", users });
});
app.post('/submission', async (req,res) => {
    const { name, age, place,password} = req.body;

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const newUser = { name, age, place,hashedPassword, salt };
    await collection.insertOne(newUser);
    const users = await collection.find().toArray();
    res.render("index",{ title : "updates", users });
});

app.post('/delete/:age',  async (req, res) => {
    const age = req.params.age;
    await collection.deleteOne({ age });
    const users = await collection.find().toArray();
    res.render("index",{ title : "updates", users });
});

app.post('/edit/:age',  async (req, res) => {
    const age = req.params.age;
    const { name1 } = req.body;
    await collection.updateOne({age},{$set : {name : name1}});
    const users = await collection.find().toArray();
    res.render("index",{ title : "updates", users });
});
app.use((req,res,next) => {
    res.send("sorry its not a valid link");
    next();
})
app.listen(3006, () => {
    console.log('Server is running on http://localhost:3006');
});
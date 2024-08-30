const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true}));

let plNames = [];

app.get("/", (req,res) =>{
    res.status(200).render("index", { pageTitle : "Home page",
        plNames : plNames });
});

app.get("/contact", (req,res) =>{
    res.status(200).render("contact", { pageTitle : "Contact page"});
});

app.post("/", (req,res) =>{
    plNames.push(req.body.plNames);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
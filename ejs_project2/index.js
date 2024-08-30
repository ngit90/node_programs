const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;

app.set("view engine", "ejs");
app.use(express.static("public"));
//app.use(bodyParser.urlencoded({ extended : true}));

const cards = [
    {
      title: 'Qualification',
      text: 'Here the details of the qualification of the candidate.',
      buttonText: 'Learn More',
      buttonLink: '#'
    },
    {
      title: 'Experience',
      text: 'Here the details of the experiences of the candidate.',
      buttonText: 'Learn More',
      buttonLink: '#'
    },
    {
      title: 'Services',
      text: 'Here the services provided by them in detail based on their exp.',
      buttonText: 'Learn More',
      buttonLink: '#'
    }
  ];

app.get('/', (req, res) => {
    res.status(200).render('index', { cards: cards });
  });
  

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
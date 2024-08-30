const express = require('express');
const app = express();
const port = 3003;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images) from the "public" directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route for the homepage with the form
app.get('/', (req, res) => {
  res.render('index', { alert: null });
});

// Route to handle form submissions
app.post("/", (req, res) => {
  const { name, email } = req.body;
  let alert;

  if (name && email) {
    // If both fields are filled, show a success alert
    alert = {
      type: 'success',
      message: 'Form submitted successfully! Thank you, ' + name + '.'
    };
  } else {
    // If any field is empty, show an error alert
    alert = {
      type: 'danger',
      message: 'Error: Please fill in all fields.'
    };
  }

  // Render the page with the alert message
  res.render('index', { alert: alert });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images) from the "public" directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Use sessions to keep track of the user's login state
app.use(session({
  secret: 'secret-key',  // Replace with a more secure key in production
  resave: false,
  saveUninitialized: false,
}));

// Middleware to set return back
function preventCache(req,res,next){
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
}

// Middleware to check if the user is logged in
function checkLogin(req, res, next) {
  if (req.session.loggedIn) {
      return  next();
  }
   res.redirect('/');
}

// Route for the login page
  app.get('/', (req, res) => {
    res.render('login', { alert: null });
  });

  app.get('/new',(req,res) => {
    res.render("new");
  });
  app.post('/formsub', (req,res) => {
    const { data } = req.body;
    console.log(`data from page ${data}`);
    res.render("new");
  });

// Handle login form submission
app.post('/login', preventCache, (req, res) => {
  const { email, password } = req.body;

  // Simple authentication logic
  if (email === 'noopu.das90@gmail.com' && password === 'noopura') {
    req.session.loggedIn = true;
    res.redirect('/home');
  } else {
    res.render('login', { alert: { type: 'danger', message: 'Invalid email or password' } });
  }
});

// Route for the home page 
app.get('/home', checkLogin,preventCache, (req, res) => {
  res.render('home');
});

// Handle sign-out
app.post('/signout', (req, res) => {
  req.session.destroy( err => {
    if (err) {
      return res.redirect('/home');
    }
    res.clearCookie('connect.sid');  // Clear session cookie
    res.redirect('/');
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

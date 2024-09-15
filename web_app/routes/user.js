const express = require('express');
const router = express.Router();


function preventCache(req,res,next){
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  }

  // Routes
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

router.get('/login', preventCache, (req, res) => {
    res.render('login',{ alert: null });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});


router.get('/home', preventCache, (req, res) => {
    if (req.session.user) {
        res.render('home', { username: req.session.user.username });
    } else {
        res.redirect('/login');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await req.usersCollection.findOne({ username, password }); 
    if (user) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        res.render('login', { alert: { type: 'danger', message: 'Invalid Email or Password' } });
    }
});

router.post('/signup',  async (req, res) => {
    const { username,email, password } = req.body;
    const newUser = { username, email, password }; //
    await req.usersCollection.insertOne(newUser); //
    req.session.user = newUser;
    res.redirect('/login');
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');  // Clear session cookie
        res.redirect('/login');

    });
});

module.exports = router;
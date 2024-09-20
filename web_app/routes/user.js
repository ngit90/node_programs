const express = require('express');
const router = express.Router();
const crypto = require('crypto');

function preventCache(req,res,next){
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
}

function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
}
  
  function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
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
    res.render('signup',{ alert: null });
});


router.get('/home', preventCache, (req, res) => {
    if (req.session.user) {
        res.render('home', { username: req.session.user.name });
    } else {
        res.redirect('/login');
    }
});

router.post('/login',  async (req, res) => {
    const { username, password } = req.body;
    const user = await req.usersCollection.findOne({ username }); 
    if (user == null) {
    return res.render('login', { alert: { type: 'danger', message: 'Invalid User' } });
    }
    const hashedPassword = hashPassword(password, user.salt);
    //console.log(user.salt);

    if (hashedPassword === user.hashedPassword) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        res.render('login', { alert: { type: 'danger', message: 'Invalid Username or Password' } });
    }
});

router.post('/signup',  async (req, res) => {
    const { name,username,email, password } = req.body;
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    const existingUser = await req.usersCollection.findOne({ username });
    if (existingUser) {
        res.render('signup', { alert: { type: 'danger', message: 'Username already exists. Please choose another one.' } });
    } else {
    const newUser = { name,username, email, hashedPassword, salt }; //
    await req.usersCollection.insertOne(newUser); //
    req.session.user = newUser;
    res.redirect('/login');
    }
});

router.post('/logout',preventCache, (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');  // Clear session cookie
        res.redirect('/login');

    });
});

module.exports = router;

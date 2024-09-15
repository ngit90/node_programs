const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Middleware for checking admin authentication
function adminAuth(req, res, next) {
    if (req.session.admin) {
        next();  // Admin is authenticated
    } else {
        res.redirect('/admin/login');  // Redirect to admin login if not authenticated
    }
}

function preventCache(req,res,next){
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
}

// Admin login pagecls
router.get('/login', preventCache, (req, res) => {
    res.render('adminLogin', { alert: null });
});

// Admin login handler
router.post('/login', preventCache, async (req, res) => {
    const { username, password } = req.body;
    const admin = await req.adminCollection.findOne({ username, password });
    if (admin) {
        req.session.admin = admin;
        res.redirect('/admin/dashboard');
    } else {
        res.render('adminLogin', { alert: { type: 'danger', message: 'Invalid username or password' } });
    }
});

// Admin dashboard (view users)
router.get('/dashboard', adminAuth,  preventCache, async (req, res) => {
    const users = await req.usersCollection.find().toArray();
    res.render('adminDashboard', { users });
});

// Search for users
router.get('/search', adminAuth, preventCache, async (req, res) => {
    const { query } = req.query;
    const users = await req.usersCollection.find({ username: new RegExp(query, 'i') }).toArray();
    res.render('adminDashboard', { users });
});

router.get('/create',(req, res) => {
    res.render('adminCreate');
});

// Create new user
router.post('/create', adminAuth, preventCache, async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = { username, email, password };
    await req.usersCollection.insertOne(newUser);
    res.redirect('/admin/dashboard');
});

// Edit user
router.get('/edit/:id', adminAuth, preventCache, async (req, res) => {
    const userId = req.params.id;
    const user = await req.usersCollection.findOne({ _id: new ObjectId(userId) });
    res.render('adminEditUser', { user });
});

router.post('/edit/:id', adminAuth,  preventCache, async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    await req.usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { username, email, password } }
    );
    res.redirect('/admin/dashboard');
});

// Delete user
router.post('/delete/:id', adminAuth,  preventCache, async (req, res) => {
    const userId = req.params.id;
    await req.usersCollection.deleteOne({ _id: new ObjectId(userId) });
    res.redirect('/admin/dashboard');
});

// Admin logout
router.get('/logout',  preventCache, (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');  // Clear session cookie
        res.redirect('/admin/login');
    });
});

module.exports = router;

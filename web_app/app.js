const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoutes');  // Import admin routes
const userRoutes = require('./routes/user');          // Import user routes
const app = express();

const url = 'mongodb://localhost:27017';
const dbName = 'myapp';
let db, usersCollection, adminCollection;

async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(url, {});
        db = client.db(dbName);
        usersCollection = db.collection('users');
        adminCollection = db.collection('admins');  // Admin collection for login
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
    }
}
connectToMongoDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Attach the collections to the request so the routes can access them
app.use((req, res, next) => {
    req.usersCollection = usersCollection;
    req.adminCollection = adminCollection;
    next();
});

// Admin routes
app.use('/admin', adminRoutes);
//User routes
app.use('/', userRoutes);        

// Start server
app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});

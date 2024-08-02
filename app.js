const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory user store
const users = {};

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Render the login page
app.get('/', (req, res) => {
    res.render('login', { message: '' });
});

// Render the signup page
app.get('/signup', (req, res) => {
    res.render('signup', { message: '' });
});

// Handle signup
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('signup', { message: 'Email and password are required' });
    }

    if (users[email]) {
        return res.render('signup', { message: 'User already exists' });
    }

    users[email] = { email, password };
    res.redirect('/');
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { message: 'Email and password are required' });
    }

    const user = users[email];

    if (!user || user.password !== password) {
        return res.render('login', { message: 'Invalid credentials' });
    }

    res.send('Login successful');
});

// Start the server
app.listen(3000);

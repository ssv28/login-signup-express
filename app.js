const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const data = fs.readFileSync('data/data.json', 'utf-8');
let jsonData = JSON.parse(data);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const userExists = jsonData.find(user => user.email === email);
        if (userExists) {
            return res.send('User already exists. Please login.');
        }

        jsonData.push(req.body);

        fs.writeFileSync('data/data.json', JSON.stringify(jsonData), 'utf-8');
        return res.redirect('/');

    } else {

        res.send('Email and Password are required.');
    }

});

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const user = jsonData.find(user => user.email === email && user.password === password);
    if (user) {
        res.send(`Welcome ${email}!`);
    } else {
        res.send('Invalid email or password.');
    }

});

// Start the server
app.listen(3000);

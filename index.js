const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const path = require('path');

const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

app.use(express.static('public'));

// Routes
app.use('/api/orders', orderRoutes);


app.listen(4000, () => {
    console.log('listening on port 3000');
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/about', (req, res) => {
    res.render('about.html');
});

app.get('/contact', (req, res) => {
    res.render('contact.html');
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/notfound.html');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
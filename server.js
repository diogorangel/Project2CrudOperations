// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const booksRoutes = require('./routes/books'); 
const authorsRoutes = require('./routes/authors'); // Import the authors router
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Use the routers for their respective routes
app.use('/books', booksRoutes); 
app.use('/authors', authorsRoutes); // Add the authors router

console.log("Database initialized");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
});
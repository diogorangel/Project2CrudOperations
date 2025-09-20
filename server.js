// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const booksRoutes = require('./routes/books'); 
const authorsRoutes = require('./routes/authors'); 
require('dotenv').config();

// Adicione as bibliotecas do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importe o arquivo de especificação

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'Origin, X-Requested-With, Content-Type, Accept, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Use the routers for their respective routes
app.use('/books', booksRoutes); 
app.use('/authors', authorsRoutes);

console.log("Database initialized");
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
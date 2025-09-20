// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Este campo já está correto
    info: {
      title: 'Books and Authors API',
      version: '1.0.0',
      description: 'A simple API for managing a collection of books and authors.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
        schemes: ['https', 'http']
      },
      {
        url: 'https://project2crudoperations.onrender.com',
        description: 'Production server',
        schemes: ['https', 'http']
      },
    ],
  },
  apis: [
    // Corrija os caminhos removendo o '../'
    './routes/books.js',
    './routes/authors.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
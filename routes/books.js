// routes/books.js
const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

// Routes for the books collection
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
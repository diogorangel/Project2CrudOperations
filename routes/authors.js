// routes/authors.js
const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authors');

// Routes for the authors collection
router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getSingleAuthor);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
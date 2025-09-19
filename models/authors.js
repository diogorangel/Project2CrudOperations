// models/authors.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  bio: { type: String, default: 'No biography available.' },
  birth_date: { type: Date },
  // Exemplo de como referenciar a coleção de livros
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Author', authorSchema);
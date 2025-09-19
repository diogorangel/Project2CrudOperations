// models/books.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  // Adicione 5 campos adicionais aqui para totalizar 7+ campos
  isbn: { type: String, required: true },
  published_date: { type: Date },
  genre: { type: String },
  pages: { type: Number },
  publisher: { type: String },
});

module.exports = mongoose.model('Book', bookSchema);
// controllers/books.js
const Book = require('../models/books'); // Import the book model you created

// 1. Get all books (getAll)
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error: error.message });
  }
};

// 2. Get a single book (getSingle)
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the book', error: error.message });
  }
};

// 3. Create a new book (create)
const createBook = async (req, res) => {
  try {
    // Basic validation (can be improved with libraries like Joi or Express-Validator)
    if (!req.body.title || !req.body.author || !req.body.isbn) {
      return res.status(400).json({ message: 'Title, author, and ISBN are required fields.' });
    }

    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook); // 201 Created
  } catch (error) {
    res.status(500).json({ message: 'Error creating the book', error: error.message });
  }
};

// 4. Update a book (update)
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the book', error: error.message });
  }
};

// 5. Delete a book (delete)
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({ message: 'Book deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the book', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
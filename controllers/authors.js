// controllers/authors.js
const Author = require('../models/authors');

// 1. Get all authors (getAll)
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving authors', error: error.message });
  }
};

// 2. Get a single author (getSingle)
const getSingleAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the author', error: error.message });
  }
};

// 3. Create a new author (create)
const createAuthor = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: 'Author name is a required field.' });
    }

    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json(newAuthor); // 201 Created
  } catch (error) {
    res.status(500).json({ message: 'Error creating the author', error: error.message });
  }
};

// 4. Update an author (update)
const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the author', error: error.message });
  }
};

// 5. Delete an author (delete)
const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    res.status(200).json({ message: 'Author deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the author', error: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
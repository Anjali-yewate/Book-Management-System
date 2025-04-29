// src/components/BookManager.js
import React, { useState, useEffect } from 'react';
import { getAllBooks, createBook, updateBook, deleteBook } from '../services/BookService';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', id: null });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await getAllBooks();
    setBooks(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateBook(formData.id, { title: formData.title, author: formData.author });
    } else {
      await createBook({ title: formData.title, author: formData.author });
    }
    setFormData({ title: '', author: '', id: null });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setFormData(book);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="container">
      <h1>📚 Book Management System</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Book Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <button type="submit">{formData.id ? 'Update' : 'Add'} Book</button>
      </form>

      {/* Book List */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => handleEdit(book)}>✏️ Edit</button>
            <button onClick={() => handleDelete(book.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookManager;

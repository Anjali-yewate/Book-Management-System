
// src/services/BookService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/books';

export const getAllBooks = () => axios.get("http://localhost:8085/Books/getbooks");

export const createBook = (book) => axios.post("http://localhost:8085//addbooks");

export const updateBook = (id, book) => axios.put("http://localhost:8085/addbooks");

export const deleteBook = (id) => axios.delete("http://localhost:8085/deletebooks/222");

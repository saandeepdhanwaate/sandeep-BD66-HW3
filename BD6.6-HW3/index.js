const express = require("express");
const app = express();
const cors = require("cors");
const {
  getAllBooks,
  getBookById,
} = require("./controllers/index.controller.js");

app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Books  🟢
app.get("/books", async (req, res) => {
  try {
    let books = await getAllBooks();
    if (!books) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Retrieve Book by ID  🟢

app.get("/books/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app };

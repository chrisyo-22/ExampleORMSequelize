const express = require("express");
const bookRouter = express.Router();
const bookServ = require("../../services/bookService");
const { asyncHandler } = require("../api/getSendResult");

//Search books with pagination and filters
bookRouter.get("/", asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const name = req.query.name || "";
    const author = req.query.author || "";
    return await bookServ.getBooksByPage(page, limit, name, author);
}));

//Add a new book
bookRouter.post("/", asyncHandler(async (req, res) => {
    return await bookServ.addBook(req.body);
}));

//Get book info by id
bookRouter.get("/:id", asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    return await bookServ.getBookById(bookId);
}));

//Delete a book by id
bookRouter.delete("/:id", asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    await bookServ.deleteBook(bookId);
    return { message: "Book deleted successfully" };
}));

//Update a book by id
bookRouter.put("/:id", asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    await bookServ.updateBook(bookId, req.body);
    return { message: "Book updated successfully" };
}));

module.exports = bookRouter;

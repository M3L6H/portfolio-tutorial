const express = require("express");
const router = express.Router();

const bookCtrl = require("../controllers/book");

// Endpoint to create a book
router.post("", bookCtrl.saveBook);

// Endpoint to get all books
router.get("", bookCtrl.getBooks);

// Endpoint to update the data in a book
router.patch("/:id", bookCtrl.updateBook);

// Endpoint to delete a book from the database
router.delete("/:id", bookCtrl.deleteBook);

module.exports = router;
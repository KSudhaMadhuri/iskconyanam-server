const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookPrice: {
    type: String,
    required: true,
  },
  bookImage: {
    type: String,
    required: true,
  },
  bookSummary: {
    type: String,
  },
  bookPages: {
    type: String,
    required: true,
  },
  bookLanguage: {
    type: String,
    required: true,
  },
  bookSize: {
    type: String,
  },
  bookWeight: {
    type: String,
  },
  outOfStock: {
    type: String,
    required:true,
  },
  itemType:{
    type: String,
    required:true,
  }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

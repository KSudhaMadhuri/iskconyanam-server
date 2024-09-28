const express = require("express");
const route = express.Router();
const booksController = require("../controller/booksController");

route.post("/createbooks", booksController.creatingBooks);
route.get("/getbooks", booksController.getBooks);
route.delete("/delbooks/:bookId", booksController.delBooks);
route.put("/updateprice/:id", booksController.updateBookPrice);
route.put("/updatebookdetails/:id",booksController.updateAll);
route.get("/getsinglebook/:id",booksController.singleBook)
module.exports = route;

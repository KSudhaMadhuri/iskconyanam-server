const Book = require("../model/Book");

//creatingBooks
const creatingBooks = async (req, res) => {
  try {
    const {
      bookName,
      bookAuthor,
      bookPrice,
      bookImage,
      bookSummary,
      bookPages,
      bookLanguage,
      bookSize,
      bookWeight,

    } = req.body;
    const stock="stock"
    const saveBooks = new Book({
      bookName,
      bookAuthor,
      bookPrice,
      bookImage,
      bookSummary,
      bookPages,
      bookLanguage,
      bookSize,
      bookWeight,
      outOfStock:stock
    });
    await saveBooks.save();
    res.status(200).json({ message: "Book details saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//getting booksController logic
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const delBooks = async (req, res) => {
  try {
    const id = req.params.bookId;
    const delBook = await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully", delBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const updateBookPrice = async (req, res) => {
  try {
    const { bookPrice } = req.body;
    console.log(bookPrice);
    const updatePrice = await Book.findByIdAndUpdate(
      req.params.id,

      { $set: { bookPrice: bookPrice} },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Book price updated successfully", updatePrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }

};
const updateAll = async (req, res) => {
  try {
    const updatedData = req.body;
    
    // Check if id exists
    if (!req.params.id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Update the book details
    const updateBookDetails = await Book.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    // If the book is not found
    if (!updateBookDetails) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Successfully updated
    res
      .status(200)
      .json({ message: "Updated successfully", updateBookDetails });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const singleBook=async(req,res)=>{
  try {
    const bookOne= await Book.findById(req.params.id)
    res.status(200).json(bookOne)
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

module.exports = { creatingBooks, getBooks, delBooks, updateBookPrice, updateAll,singleBook};

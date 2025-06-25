import Book from "../models/bookModel.js"

export const addBook = async (req, res) => {  
  try {
      if (!req.body.title || !req.body.author || !req.body.year){
          return res.status(400).send({message: "Please enter all values."});
      }
      
      const book = new Book ({ title: req.body.title, author: req.body.author, year: req.body.year });
      const newBook = await book.save();

      res.status(201).send(newBook);
  }
  catch (err){
      res.status(500).send({message: err.message})
  }
}

export const getAllBooks = async (req, res) => {
  try {
      const books = await Book.find();
      res.status(200).send(books);
  }
  catch (err){
      res.status(500).send({message: err.message})
  }
}

export const getBook = async (req, res) => {
  try {
      const book = await Book.findById(req.params.id);
      if(!book) return res.status(404).send({message: "Book not found."});
      res.status(200).send(book);
  }
  catch(err){
      res.status(500).send({message: err.message});
  }
}

export const updateBook = async (req, res) => {
  try {
      if (!req.body.title || !req.body.author || !req.body.year){
          return res.status(400).send({message: "Please enter all fields correctly."});
      }

      const updatedBook = {
        title: req.body.title, 
        author: req.body.author, 
        year: req.body.year
      }
      const net = await Book.findByIdAndUpdate(req.params.id, updatedBook);
      if(!net) return res.status(404).send({message: "An error occurred. Please try again."});
      return res.status(200).send({message: "Updation successful."});
  }
  catch (err){
      res.status(500).send({message: err.message})
  }
}

export const deleteBook = async (req, res) => {
  try {
      const net = await Book.findByIdAndDelete(req.params.id);
      if(!net) return res.status(404).send({message: "An error occurred. Please try later."});
      return res.status(200).send({message: "Deletion successful."});
  } catch(err) {
      res.status(500).send({message: err.message});
  }
}

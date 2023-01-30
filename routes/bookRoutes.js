const {getAllBooks,addBook,delRentReturn,booksRentedByaUser} = require("../controllers/books.contr")
const {isAuthenticated,isAdmin} = require("../middleware/authentication")
const routes =(app)=>{ 
    app.get('/books/list',isAuthenticated, getAllBooks)  //gets all the book list
    app.post('/book/create',isAuthenticated,isAdmin, addBook) //add the book list
    app.post('/book',isAuthenticated, isAdmin, delRentReturn)
    app.get('/rented/:userId',isAuthenticated, booksRentedByaUser)
}


module.exports = routes;
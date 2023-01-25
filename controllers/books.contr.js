
const { User, Book } = require("../models//index")

exports.getAllBooks = async (req, res) => {
    let booklist = await Book.findAll()
    res.status(200).json({
        message: booklist
    })

}

exports.addBook = async (req, res) => {
    let { name, author, publishedOn } = req.body;
    publishedOn = publishedOn || Date.now()
    await Book.create({ name, author, publishedOn })
    res.status(200).json({
        message: "Successfully created"
    })
}

exports.delRentReturn = async (req, res) => {
    try {
        let del = req.query.delete;
        let retur = req.query.return
        let rent = req.query.rent
        if (del) {
            let delBook = await Book.findByPk(req.body.isBnNo)
            if (delBook && delBook.rentedBy === 0) {
                console.log("+++++++++++++++++in if")
                await Book.destroy({ where: {isBnNo: req.body.isBnNo} })
                res.status(200).json({ massage: "Book deleted successfully" })
            }
            else {
                res.status(400).json({ massage: "Book Not found" })
            }

        }
        else if (rent) {
            let { userId, isBnNo } = req.body
            let book = await Book.findByPk(isBnNo)
            let user = await User.findByPk(userId)
            if (book && book.rentedBy == 0) {
                let bookalreadyrented = await Book.findAll({
                    where: { rentedBy: userId }
                })
                if (bookalreadyrented.length < 2) {
                    await Book.update({ rentedBy: userId }, { where: { isBnNo: isBnNo } })
                    res.status(200).json({ massage: "Book rented successfully" })
                }
                else {
                    res.status(400).json({ message: "Cannot rent more than 2 books" })
                }
            } else {
                res.status(400).json({ message: "Book Unvailable/rented already" })
            }
        }
        else if (retur) {
            let { isBnNo } = req.body
            await Book.update({ rentedBy: 0 }, { where: { isBnNo: isBnNo } })
            res.status(200).json({ massage: "Book returned successfully" })

        }
    } catch (error) {
        console.log(error)
    }

}



exports.booksRentedByaUser = async (req, res) => {
    try {
        let { userId } = req.params; //{userId: '1'}vit takes 1
            let rentedList = await Book.findAll({
            where: { rentedBy: userId }
        })
        res.status(200).json({
            message: "Find the books if rented Any",
            booklist: rentedList
        })
    } catch (error) {
        console.log(error)
    }

}
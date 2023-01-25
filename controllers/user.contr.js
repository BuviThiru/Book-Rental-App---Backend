const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models//index")

exports.signup = async function (req, res) {
    try {
        let { name, email, password, isAdmin } = req.body
        password = await bcrypt.hash(password, 10)
        await User.create({ name, email, password, isAdmin })
        res.status(400).json("message:User signed up sucessfully")
    }
    catch { (error) => console.log(error) }
}

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ where: { email: email } })
        if (!User) {
            res.status(400).json({ error: "Invalid username" })
        }
        else {
            let validpassword = await bcrypt.compare(password, user.password)
            if (validpassword) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECTRET_KEY)
                res.status(200).json({ message: "Successfully logged in", Token: token })
            }
            else res.status(400).json({ error: "Invalid password" })
        }

    }
    catch {
        (error) => console.log(error)
    }
}
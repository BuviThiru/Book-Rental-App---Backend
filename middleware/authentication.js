const jwt = require("jsonwebtoken");
const { User } = require("../models//index")

exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            res.status(400).json({ Error: "Token not provided" })
        } else {
            const isValid = jwt.verify(token, process.env.JWT_SECTRET_KEY)
            console.log(".....................ISvlid",isValid)
            const user = await User.findByPk(isValid.id)
            req.user = user
           
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ Error: "User not authenticated" })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
           res.status(400).json({ Error: "User is not an admin" })
        } else next()
    } catch (error) {
        console.log(error)
    }

}
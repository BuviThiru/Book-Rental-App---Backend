const express = require("express");
const app = express();
require("dotenv").config({path:"config.env"});

const {sequelize} = require("./models/index")

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let userRoutes = require("./routes/userRoutes")
userRoutes(app);

let bookRoutes =require("./routes/bookRoutes")
bookRoutes(app);



const PORT = process.env.PORT || 3000;

app.listen(PORT, async function(req,res){
    // await sequelize.sync();
    console.log("Server has started at port " + PORT)})

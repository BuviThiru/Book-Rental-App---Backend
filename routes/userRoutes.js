const {signup,login} = require("../controllers/user.contr")

const routes =(app)=>{ 
    app.post("/user/create",signup)
    app.post("/user/login",login)
}

module.exports = routes;
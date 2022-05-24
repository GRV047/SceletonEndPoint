'use strict'
const AuthRouter = require("express").Router();
const AuthControler = require("../controller/auth.controller")

AuthRouter.get('/',(req,res)=>{
    res.status(200).send("It's Up and working............!!! 🍺🍺");
    res.end();
})

//Login Rout
AuthRouter.post('/login', AuthControler.login);

//Create new user rout
AuthRouter.post('/signUp',AuthControler.createNewUser) 


module.exports = AuthRouter;
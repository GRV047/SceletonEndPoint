'use strict'
const AuthRouter = require("express").Router();
const AuthControler = require("../controller/auth.controller")

//Login Rout
AuthRouter.post('/login', AuthControler.login);

//Create new user rout
AuthRouter.post('/signUp',AuthControler.createNewUser) 


module.exports = AuthRouter;
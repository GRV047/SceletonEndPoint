const express = require("express");
const routers = express.Router();
const path = require("path");
require("dotenv").config();

//modules
const ADMIN_PARENT_ROUT = require("./admin/routes/auth.routes");

//TESTING SERVER

routers.get('/',(req,res)=>{
    res.status(200).send("It's Up and working............!!! 🍺🍺");
    res.end();
})

routers.use('/admin', ADMIN_PARENT_ROUT);

routers.all('*',(req,res)=>{
    res.status(404).send("404............!!!! Not Found");
    res.end();
})


module.exports = routers;
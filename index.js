/* Server configuration */

const express = require("express");
const cors = require("cors");
const PARENT_ROUT = require("./modules/main")

class server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.use(cors());
        this.app.options("*", cors());
        this.app.use(express.urlencoded({
            limit: "40mb",
            extended: false
        }));
        this.app.use(express.json({
            limit: "10mb"
        }));
    }


    routes() {
        this.app.use("/api", PARENT_ROUT)
    }
}

module.exports = new server().app;

// Configutration


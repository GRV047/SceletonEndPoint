require("reflect-metadata");

// Importent^

const debug = require("debug");
const { createServer } = require('http');
const AppServer = require("../index");
const config = require("../config/config") //Environment
const mongoos = require("mongoose");
const { normalize } = require("path");

//debug("api:server")

const port = normalize(process.env.PORT || 3000);
AppServer.set("port",port);
const server = createServer(AppServer); //SERVER CREATION

//Connecting DB

var mongoconnection = mongoos.connect(config.mongodb.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoconnection.then(con=>{
    console.log("DB Connect Sucessfully........!!! Cheers....!!!🍺🍺")
    return server.listen(port)
}).then(res=>console.log(`Server is listning on port ${port}`))
.catch(err=>console.log("Oops....!!! Something went Wrong...."));


server.on("error",onError);
server.on("Listning",onListening)


function onError(error) {
    console.log(error)
    if (error.syscall !== 'listen') { throw error; }
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
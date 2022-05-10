const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
    throw new Error(".env File Not Found");
}
const config = {
    production:{
        port: parseInt(process.env.PORT),
        mongodb: {
            url: process.env.MONGODB_URL,
        },
        api: {
            prefix: '/api'
        },
        SECRET_KEY: process.env.SECRET_KEY
    },
    development:{
        port: parseInt(process.env.PORT),
        mongodb: {
            url: process.env.MONGODB_URL,
        },
        api: {
            prefix: '/api'
        },
        SECRET_KEY: process.env.SECRET_KEY
    }
}
const environment = process.env.NODE_ENV || 'development';
console.log(environment);
module.exports = config[environment];
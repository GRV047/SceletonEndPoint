'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcrypt');

const authSchema = new Schema({
    name: Joi.string().required(),
    mobile: Joi.number().strict().required().min(1000000000).message("Mobile no. must be 10 digits").max(9999999999).message("Mobile no. must be 10 digits"),
    userName:Joi.string().required(),
    password: Joi.string().required().min(5).max(25).message("Password must be between 5 and 25 characters"),
    email: Joi.string().email().message("Please Enter a valid email address")
});


module.exports = mongoose.model('Admin', authSchema, 'Admin');
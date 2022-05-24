'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const bcrypt = require('bcrypt');

const authSchema = new Schema({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required().min(5).max(20).message("minimum charecter 5 and maximum charecter 20 is require"),
    email: Joi.string().email().message("Email is not valid"),
    fullAddress: Joi.string().required(),
    city: Joi.string().required(),
    pin: Joi.string().required().min(100000).message("Pin code must be 6 digit number").max(999999).message("Pin code must be 6 digit number")
});

authSchema.pre('save', async function (next) {
    try {
        let user = this;
        if (!user.isModified("password") || !user.isNew) return next();
        //password hashing here
        const salt = await bcrypt.genSalt(10);
        const passwordHased = await bcrypt.hash(this.password, salt);
        this.password = passwordHased;
        next();
    } catch (err) {
        next(err);
    }
});

authSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

//generated Incripted Password
authSchema.methods.generateHash = async function(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHased = await bcrypt.hash(password, salt);
        return passwordHased;
    } catch (err) {
        throw new Error(err);
    }
}

//Matching weather Password matches with saved data.
authSchema.methods.isPasswordValid = async function(enteredPassword) {
    try {
        return bcrypt.compare(enteredPassword, this.password)
    } catch (err) {
        throw new Error(err);
    }
}

authSchema.set('timestamps', true);

module.exports = mongoose.model('Admin', authSchema, 'Admin');
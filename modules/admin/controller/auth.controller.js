const Joi = require('joi');
const AdminModel = require('../model/auth.model');
//const FileLibraryModel = require('../../client/models/file-library.model');
const jwt = require('jsonwebtoken');
const { handleError, handleSuccess } = require("../../../utils/responseStatusMethods");
const Config = require('../../../config/config');

module.exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body

        const logInSchema = Joi.object({
            userName: Joi.required(),
            password: Joi.required()
        });

        const valid = logInSchema.validate(req.body);

        if (valid.error) return handleError(res, valid.error, 400, null);

        const user = await AdminModel.findOne({ userName, status: true });
        if (!user) return handleError(res, valid.error, 400, null);

        const isValid = await user.isPasswordValid(password)
        if (!isValid) return handleError(res, "Invalid Number or Password.", 400, null);

        const token = getSignedToken(user)
        return handleSuccess(res, "Request Sucessfull.", 200, { user, token })
    } catch (err) {
        err.status = 400;
        return next(err);
    }
}

module.exports.createNewUser = async(req,res,next)=>{
    try{
        console.log(req.body);
        const new_user = req.body;
        const user = await AdminModel.findOne({email:new_user.email})
    
        if(user) return handleError(req,"Allready Exists",400,null);
        else{
            const newUser = await AdminModel.create(new_user);
            return handleSuccess(res,"New User Created Successfully", 200,{newUser})
        }
    }catch (err){
        return handleError(res,"Oops, Something went wrong........!!!",400,null);
    }

}



getSignedToken = user => {
    return jwt.sign({ user }, Config.SECRET_KEY, { expiresIn: '1hr' });
}
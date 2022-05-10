const handleError = (res,errMsg,status,data)=>{
    const response = {
        success:false,
        status,
        errMsg,
        data
    }
    res.setHeader("strict-transport-security","max-age=15552000");
    return res.status(status).json(response);
}

const handleSuccess=(res, message,status,data) => {
    const response = { success:true, status, message, data };
    res.setHeader('strict-transport-security', 'max-age=15552000')
    return res.status(status).json(response);
};

const handleServerError = (res, message,status,data) => {
    const response = { success:false, status, message, data };
    res.setHeader('strict-transport-security', 'max-age=15552000')
    return res.status(status).json(response);
};

module.exports = {
    handleError,
    handleSuccess,
    handleServerError
}
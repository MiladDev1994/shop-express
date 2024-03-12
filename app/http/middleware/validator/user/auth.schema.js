const joi = require("@hapi/joi");

const getOtpSchema = new joi.object({
    // email: joi.string().lowercase().trim().email().required().error(new Error("email is false")),
    // password: joi.string().min(6).max(16).trim().required().error(new Error("password is false")),
    mobile: joi.string().length(11).trim().pattern(/^09[0-9]{9}$/).error(new Error("mobile is false"))
})

const checkOtpSchema = new joi.object({
    mobile: joi.string().length(11).trim().pattern(/^09[0-9]{9}$/).error(new Error("mobile is false")),
    code: joi.string().min(4).max(6).error(new Error("otp is false"))
})

module.exports = {
    getOtpSchema,  
    checkOtpSchema,  
}
const fs = require("fs");
const path = require("path");
const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { SECRET_KEY, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");

function RandomNumberGenerator() {
    return Math.floor((Math.random() * 90000 + 10000))
}

function SignAccessToken(userId) {
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            id: user._id,
        };
        const option = {
            expiresIn: "1w"
        };
    
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, option, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("server error!!!"))
            resolve(token)
        })

    })
}

function SignRefreshToken(userId) {
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            id: user._id,
        };
        const option = {
            expiresIn: "1y"
        };
    
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, option, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("server error!!!"))
            resolve(token)
        })

    })
}

function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createHttpError.Unauthorized())
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, __v: 0, otp: 0})
            if (!user) reject(createHttpError.NotFound("user not found"))
            resolve(mobile)
        })

    })
}

function deleteFileInPublic(fileAddress) {
    if (typeof fileAddress == "string") {
        const filePath = path.join(__dirname, "..", "..", "public", fileAddress);
        fs.unlinkSync(filePath)
    } else {
        fileAddress.forEach(element => {
            const filePath = path.join(__dirname, "..", "..", "public", element);
            fs.unlinkSync(filePath)
        });
    }
}

module.exports = {
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic
}
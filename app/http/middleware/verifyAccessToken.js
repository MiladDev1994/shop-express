const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");


function VerifyAccessToken(req, res, next) {
    const {authorized} = req.headers;
    const [bearer, token] = authorized?.split(" ") || [];
    if (!bearer || bearer?.toUpperCase() !== "BEARER" || !token) return next(createHttpError.Unauthorized())
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
        if (err) return next(createHttpError.Unauthorized())
        const {mobile} = payload || {}
        const user = await UserModel.findOne({mobile}, {password: 0, __v: 0, otp: 0})
        if (!user) return next(createHttpError.NotFound("user not found"))
        req.user = user;
        return next()
    })
}

module.exports = {
    VerifyAccessToken
}
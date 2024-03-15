const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");

function getToken(headers) {
    const {authorized} = headers;
    const [bearer, token] = authorized?.split(" ") || [];
    if (!bearer || bearer?.toUpperCase() !== "BEARER" || !token) return next(createHttpError.Unauthorized())
    return token
}

function VerifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers)
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) throw createHttpError.Unauthorized()
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile}, {password: 0, __v: 0, otp: 0})
            if (!user) throw createHttpError.NotFound("user not found")
            req.user = user;
            return next()
        })
        
    } catch (error) {
        next(error)
    }
}

function checkRole(role) {
    return function (req, res, next) {
        try {
            const user = req.user;
            if (!user.roles.includes(role)) throw createHttpError.Unauthorized()
            return next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    VerifyAccessToken,
    checkRole
}
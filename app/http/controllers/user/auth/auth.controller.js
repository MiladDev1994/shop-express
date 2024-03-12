const { RandomNumberGenerator, SignAccessToken, VerifyRefreshToken, SignRefreshToken } = require("../../../../utils/functions");
const { getOtpSchema, checkOtpSchema } = require("../../../middleware/validator/user/auth.schema");
const Controller = require("../../controllers");
const createHttpError = require("http-errors");
const {UserModel} = require("../../../../models/users");
const { ROLES } = require("../../../../utils/constant");

class UserController extends Controller {

    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} = req.body
            const code = RandomNumberGenerator()
            const result = await this.saveUser(mobile, code)
            if (!result) throw createHttpError.Unauthorized()
            return res.status(200).send({
                code,
                message: "welcome"
            })
        } catch (err) {
            next(err)
        }
    }
    
    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body)
            const {mobile, code} = req.body;
            const user = await UserModel.findOne({mobile})
            if (!user) throw createHttpError.NotFound("user not found")
            if (user.otp.code !== +code) throw createHttpError.Unauthorized("data is false")
            const now = new Date().getTime();
            if (+user.otp.expiresIn < now) throw createHttpError.Unauthorized("otp expired")

            const accessToken = await SignAccessToken(user._id)
            const refreshToken = await SignRefreshToken(user._id)
            return res.status(201).send({
                accessToken,
                refreshToken
            })
        } catch(err) {
            next(err)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const mobile = await VerifyRefreshToken(refreshToken)
            const user = await UserModel.findOne({mobile});
            const accessToken = await SignAccessToken(user._id)
            const newRefreshToken = await SignRefreshToken(user._id)
            return res.status(201).json({
                accessToken,
                refreshToken: newRefreshToken
            })
        } catch (error) {
            next(error)
        }
    }

    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: new Date().getTime() + 120000
        }
        const result = this.checkExistUser(mobile);
        if (result) {
            this.updateUser(mobile, {otp})
        } 
        const createUser = await UserModel.create({
            mobile, 
            otp,
            roles: [ROLES.USER],
        })
        return !!createUser
    }

    async checkExistUser(mobile) {
        const user = await UserModel.findOne({mobile})
        return !!user
    }

    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, "0", undefined, null, NaN].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile}, {$set: objectData})
        return !!updateResult.modifiedCount;
    }
}

module.exports = {
    UserController: new UserController()
} 
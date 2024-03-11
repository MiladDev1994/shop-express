const { authSchema } = require("../../../middleware/validator/user/auth.schema");
const Controller = require("../../controllers");
const createHttpError = require("http-errors");

class UserController extends Controller {

    async login(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).send("welcome")
        } catch (err) {
            next(createHttpError.BadRequest(err.message))
        }
    }
}

module.exports = {
    UserController: new UserController()
} 
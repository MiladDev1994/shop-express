const createHttpError = require("http-errors");
const { getOtpSchema } = require("../../middleware/validator/user/auth.schema");
const Controller = require("../controllers");

class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            const result = await getOtpSchema.validateAsync(req.body)
            return res.status(200).send("index page store")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new HomeController() 
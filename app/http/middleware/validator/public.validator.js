const Joi = require("@hapi/joi")
const { MONGO_ID_PATTERN } = require("../../../utils/constant")
const createHttpError = require("http-errors")

const ObjectIdValidator = new Joi.object({
    id: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("mongo id is false"))
})

module.exports = {
    ObjectIdValidator
}
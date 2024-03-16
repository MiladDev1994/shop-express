const Joi = require("@hapi/joi")
const createHttpError = require("http-errors")
const { MONGO_ID_PATTERN } = require("../../../../utils/constant")

const CreateProductSchema = new Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("title is false")),
    text: Joi.string().error(createHttpError.BadRequest("text is false")),
    short_text: Joi.string().error(createHttpError.BadRequest("short_text is false")),
    type: Joi.string().error(createHttpError.BadRequest("type is false")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("tags is false")),
    category: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("category is false")),
    price: Joi.number().error(createHttpError.BadRequest("price is false")),
    discount: Joi.number().error(createHttpError.BadRequest("discount is false")),
    count: Joi.number().error(createHttpError.BadRequest("count is false")),
    weight: Joi.number().empty().error(createHttpError.BadRequest("weight is false")),
    length: Joi.number().empty().error(createHttpError.BadRequest("length is false")),
    height: Joi.number().empty().error(createHttpError.BadRequest("height is false")),
    width: Joi.number().empty().error(createHttpError.BadRequest("width is false")),
    fileName: Joi.allow().error(createHttpError.BadRequest("image is false")),
    fileUploadPath: Joi.allow(),
})



module.exports = {
    CreateProductSchema
}
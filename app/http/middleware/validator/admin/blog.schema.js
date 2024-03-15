const Joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../../utils/constant");
const createHttpError = require("http-errors");

const CreateBlogSchema = new Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("title is false")),
    text: Joi.string().error(createHttpError.BadRequest("text is false")),
    short_text: Joi.string().error(createHttpError.BadRequest("short_text is false")),
    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("image is false")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("tags is false")),
    category: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("category is false")),
    fileUploadPath: Joi.allow(),

})

module.exports = {
    CreateBlogSchema,
} 
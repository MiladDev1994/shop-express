const joi = require("@hapi/joi");
const { MONGO_ID_PATTERN } = require("../../../../utils/constant");

const addCategorySchema = new joi.object({
    title: joi.string().min(3).max(30).trim().error(new Error("title is false")),
    parent: joi.string().pattern(MONGO_ID_PATTERN).allow(null).error(new Error("parent is false"))
})

module.exports = {
    addCategorySchema,
}
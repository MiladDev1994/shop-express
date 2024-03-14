const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    title: {type: String, required: true},
    parent: {type: Types.ObjectId, ref: "category", default: undefined},
}, {
    id: false,
    toJSON: {
        virtuals: true,
    }
})

schema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent",
})

function population(next) {
    this.populate([{path: "children", select: {__v: 0}}])
    next()
}

schema
    .pre("find", population)
    .pre("findOne", population)
    .pre("findById", population)
module.exports = {
    CategoryModel: model("category", schema)
}
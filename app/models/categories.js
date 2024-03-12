const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    title: {type: String, required: true},
    parent: {type: Types.ObjectId, default: undefined},
})

module.exports = {
    CategoryModel: model("category", schema)
}
const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    title: {type: String, required: true},
    short_desk: {type: String, required: true},
    total_desk: {type: String, required: true},
    images: {type: [String], required: true},
    tags: {type: [String], default: []},
    category: {type: Types.ObjectId, required: true},
    comments: {type: [], default: []},
    like: {type: [Types.ObjectId], default: []},
    desLike: {type: [Types.ObjectId], default: []},
    bookmark: {type: [Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    type: {type: String, required: true},
    time: {type: String},
    format: {type: String},
    teacher: {type: Types.ObjectId, required: true},
    feature: {type: Object, default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madeIn: "",
    }},
})

module.exports = {
    ProductModel: model("product", schema)
}
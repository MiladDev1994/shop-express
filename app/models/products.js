const {Schema, model, Types} = require("mongoose");
const { CommentSchema } = require("./public.schema");

const schema = new Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true},
    tags: {type: [String], default: []},
    category: {type: Types.ObjectId, ref: "category", required: true},
    comments: {type: [CommentSchema], default: []},
    likes: {type: [Types.ObjectId], default: []},
    desLikes: {type: [Types.ObjectId], default: []},
    bookmarks: {type: [Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    type: {type: String, required: true},
    format: {type: String},
    supplier: {type: Types.ObjectId, required: true},
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

schema.index({title: "text", short_text: "text", text: "text"})

module.exports = {
    ProductModel: model("product", schema)
}
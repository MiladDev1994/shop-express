const {Schema, model, Types} = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Episodes = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "free"},
    time: {type: String, required: true},

})
const Chapter = new Schema({
    title: {type: String, required: true},
    text: {type: String, default: ""},
    episodes: {type: [Episodes], default: []},
})

const schema = new Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: Types.ObjectId, ref: "category", required: true},
    comments: {type: [CommentSchema], default: []},
    likes: {type: [Types.ObjectId], default: []},
    desLikes: {type: [Types.ObjectId], default: []},
    bookmarks: {type: [Types.ObjectId], default: []},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: String, default: "free", required: true},
    time: {type: String, default: "00:00:00"},
    teacher: {type: Types.ObjectId, ref: "user", required: true},
    chapter: {type: [Chapter], default: []},
    students: {type: [Types.ObjectId], default: [], ref: "user"},
})

module.exports = {
    CoursesModel: model("course", schema)
}
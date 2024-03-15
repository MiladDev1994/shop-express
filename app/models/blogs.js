const {Schema, model, Types} = require("mongoose");

const CommentSchema = new Schema({
    user: {type: Types.ObjectId, ref: "users", required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, required: new Date().getTime()},
    parent: {type: Types.ObjectId},
})
const schema = new Schema({
    author: {type: Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: [Types.ObjectId], ref: "category", required: true},
    comments: {type: [CommentSchema], default: []},
    like: {type: [Types.ObjectId], ref: "users", default: []},
    desLike: {type: [Types.ObjectId], ref: "users", default: []},
    bookmark: {type: [Types.ObjectId], ref: "users", default: []},
}, {
    id: false,
    timestamps: true, 
    toJSON: {
        virtuals: true,
    },
    versionKey: false,
})

schema.virtual("user", {
    ref: "user",
    localField: "author",
    foreignField: "_id",
})

schema.virtual("category_detail", {
    ref: "category",
    localField: "_id",
    foreignField: "category",
})

function population(next) {
    this.populate([
        {path: "user", select: {__v: 0}},
        {path: "category", select: {children: 0, __v: 0,}}
    ])
    next()
}

schema
    .pre("find", population)
    .pre("findOne", population)
    .pre("findById", population)

module.exports = {
    BlogModel: model("blog", schema)
}
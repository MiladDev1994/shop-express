const {Schema, model, Types} = require("mongoose");


const CommentSchema = new Schema({
    user: {type: Types.ObjectId, ref: "users", required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, required: new Date().getTime()},
    parent: {type: Types.ObjectId, ref: "comment"},
})

module.exports = {
    CommentSchema
}
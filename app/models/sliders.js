const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    title: {type: String},
    test: {type: String},
    image: {type: String, required: true},
    type: {type: String, default: "main"},
})

module.exports = {
    SliderModel: model("slider", schema)
}
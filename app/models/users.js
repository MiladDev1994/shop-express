const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, lowercase: true},
    phone: {type: String},
    email: {type: String, lowercase: true},
    password: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expiresIn: 0,
    }},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    roles: {type: [String], default: ["USER"]},
})

module.exports = {
    UserModel: model("user", schema)
}
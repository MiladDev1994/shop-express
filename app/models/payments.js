const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
})

module.exports = {
    PaymentModel: model("payment", schema)
}
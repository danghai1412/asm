const mongoose = require("mongoose")

var WoodenSchema = new mongoose.Schema({
    brand: String,
    image: String,
    name: String,
    price : Number,
    status : String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var WoodenModel = mongoose.model('wooden', WoodenSchema, 'wooden')
module.exports = WoodenModel
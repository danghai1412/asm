const mongoose = require("mongoose")

var LegoSchema = new mongoose.Schema({
    brand: String,
    image: String,
    name: String,
    price : Number,
    status : String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var LegoModel = mongoose.model('Lego', LegoSchema, 'lego')
module.exports = LegoModel
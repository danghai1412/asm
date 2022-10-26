const mongoose = require("mongoose")

var MohinhSchema = new mongoose.Schema({
    brand: String,
    image: String,
    name: String,
    price : Number,
    status : String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var MohinhModel = mongoose.model('mohinh', MohinhSchema, 'mohinh')
module.exports = MohinhModel
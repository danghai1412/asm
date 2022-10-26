const mongoose = require("mongoose")

var ParadigmSchema = new mongoose.Schema({
    brand: String,
    image: String,
    name: String,
    price : Number,
    status : String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})

var ParadigmModel = mongoose.model('Paradigm', ParadigmSchema, 'paradigm')
module.exports = ParadigmModel
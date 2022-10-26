const mongoose = require("mongoose")

var RobotSchema = new mongoose.Schema({
    brand: String,
    image: String,
    name: String,
    price : Number,
    status : String
}, {
    versionKey: false //optional (to remove _v: 0 when add new data)
})


var RobotModel = mongoose.model('Robot', RobotSchema, 'robot')
module.exports = RobotModel
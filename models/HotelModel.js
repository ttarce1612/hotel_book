var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    status: {type: Boolean, required: true, default: 1},
    name: {type: String, required: true},
    description: {type: String, required: false},
    address: {type: String, required: false},
    star_rating: {type: Number, required: true, default: 0},
    type: {type: String, required: false},
    createdAt: {type: Number, required: true, default: 0},
    room: {type: Number, required: true, default: 0},
    pricePerMonth: {type: Number, required: true, default: 0},
    furniture: {type: String, required: false},
    createdUser: {type: String, required: false},
    noted: {type: String, required: false},
    startDay: {type: Number, default: 0},
        endDay: {type: Number, default: 0},
        bookedBy: {type: String, required: false},
        isBook: {type: Boolean,  default: 1},
}, {timestamps: true});


module.exports = mongoose.model("hotels", UserSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Fund = new Schema({
    Name: String,
    Amount: {
        type: Number,
        required: true
    },
    Note: String,
    CreatedAt:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Fund", Fund);

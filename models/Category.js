const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Category = new Schema({
    Name: {
        type: String,
        required: true
    },
    SystemName: String,
    DefaultAmount: {
        type: Number,
        required: true
    },
    DisplayOrder: {
        type: Number,
        required: true,
        default: 0
    },  
    Active: {
        type: Boolean,
        required: true,
        default: true
    },
    Deleted: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = mongoose.model("Category", Category);
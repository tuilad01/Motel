const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Pay = new Schema({
    Name: {
        type: String,
        required: true
    }, 
    Amount: {
        type: Number,
        required: true
    },
    Note: String,
    Categorys: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    },
    Deleted: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = mongoose.model("Pay", Pay);

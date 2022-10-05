const mongoose = require("mongoose");

const toDocshema =  mongoose.Schema({
    text: String,
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    email: String,
});

const ToDo = mongoose.model("ToDo", toDocshema);

module.exports = ToDo;
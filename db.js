const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/mocha_test");

module.exports = {
    connection
}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BitSchema = new Schema({
    mid: String,
    low: String,
    high: String,
    timestamp: String
});

const Bit = mongoose.model('Bit', BitSchema);

module.exports = Bit;
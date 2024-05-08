// models/Image.js

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: String,
    imageUrl: String
});

module.exports = mongoose.model('Image', imageSchema);

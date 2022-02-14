const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/moviewDB');

const moviewSchema = {
    title: String,
    content: String,
};

const moview = mongoose.model('moview', moviewSchema);

module.exports = moview;

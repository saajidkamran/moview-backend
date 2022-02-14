const mongoose = require('mongoose');

const database= mongoose.connect('mongodb://localhost:27017/moviewDB');

module.exports=database

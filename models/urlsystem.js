const mongoose = require('mongoose');

const urlsystemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        url: {
            type: String,
        },
       
    }
);



module.exports = mongoose.model('urlsystem', urlsystemSchema);
const mongoose = require('mongoose');


const TypeDeviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            dropDups: true, // elimina duplicados
            uppercase: true,
            required: true
        },
        image: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);



module.exports = mongoose.model('TypeDevice', TypeDeviceSchema);
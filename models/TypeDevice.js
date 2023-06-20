const mongoose = require('mongoose');

const TypeDeviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique : true,
            dropDups : true,
            required: true
            
        },
        image: {
            type: String,
        },
       
    }
);



module.exports = mongoose.model('TypeDevice', TypeDeviceSchema);
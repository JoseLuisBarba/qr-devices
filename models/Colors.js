const mongoose = require('mongoose');


const ColorSchema = new mongoose.Schema(
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



module.exports = mongoose.model('Color', TypeDeviceSchema);
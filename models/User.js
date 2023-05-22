const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            uppercase: true,
            index: true,
            required: true
        },
        firstName: {
            type: String,
            uppercase: true,
            index: true,
            required: true
        },
        lastName: {
            type: String,
            uppercase: true,
            index: true,
            required: true
        },
        image: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        phone: {
            type: [String],
        },
        address: {
            type: String
        }
    }
);



module.exports = mongoose.model('User', UserSchema);
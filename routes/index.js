const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Device = require('../models/Device');
const User = require('../models/User');


// @desc Login/Landing page
// @route GET / 
router.get(
    '/', 
    ensureGuest,
    (req, res) => {
        res.render('login',
            {
                layout: 'login',
            }
        );
    }
);

// @desc Dashboard
// @route GET /dashboard 
router.get(
    '/dashboard', 
    ensureAuth,
    async (req, res) => {

        try {
            const devices = await Device.find({ user: req.user.id}).lean().exec();
            const user = await User.findById(req.user.id).lean().exec();

            console.log(req.user.image);
            res.render('dashboard',{
                name: req.user.firstName,
                photo: req.user.image,
                user,
                devices
            });
        } catch (err) {
            console.error(err);
            res.render('error/500');
        }
    }
);

module.exports = router;
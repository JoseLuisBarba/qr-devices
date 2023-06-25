const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth');
const Device = require('../models/Device');
const User = require('../models/User');
const Image = require('../models/Image');

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


// @desc Show qrdata
// @route GET /qrdata/:id
router.get(
    '/qrdata/:id', 
    async (req, res) => {
        console.log(req.params.id);
        try {
            let device = await Device.findById(req.params.id)
                .populate('user')    
                .lean()
                .exec();
            const images = await Image.find({device: device._id})
                .populate('device')
                .lean()
                .exec();

            console.log(images);

            if (!device){
                return res.render('error/404');
            }
            res.render('devices/qrdata',
                {
                    device,
                    images,
                }
            );
        } catch (err) {
            console.log(err);
            res.render('error/404');
        }
    }
);



module.exports = router;
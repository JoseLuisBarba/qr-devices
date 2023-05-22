const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const Device = require('../models/Device');


// @desc Show add page
// @route GET /devices/add 
router.get(
    '/add', 
    ensureAuth,
    (req, res) => {
        res.render('devices/add');
    }
);

// @desc Process add form
// @route POST /devices 
router.post(
    '/', 
    ensureAuth,
    async (req, res) => {
        try {
            
            req.body.user = req.user.id;
            
            await Device.create(req.body);
            console.log(req.body);
            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
            res.render('error/500');
        }
    }
);

// @desc Show all stories
// @route GET /devices
router.get(
    '/', 
    ensureAuth,
    async (req, res) => {
        try {
            const devices = await Device.find({user: req.user.id})
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()
            .exec();

            res.render('devices/index',
                {
                    devices,
                }
            );
        } catch (err) {
            console.log(err);
            res.render('error/500');
        }
    }
);


// @desc Show single device
// @route GET /devices/:id 
router.get(
    '/:id', 
    ensureAuth,
    async (req, res) => {
        try {
            let device = await Device.findById(req.params.id)
                .populate('user')    
                .lean()
                .exec();
            if (!device){
                return res.render('error/404');
            }
            res.render('devices/show',
                {
                    device,
                }
            );
        } catch (err) {
            console.log(err);
            res.render('error/404');
        }
    }
);


// @desc Show edit page
// @route GET /devices/edit/:id 
router.get(
    '/edit/:id', 
    ensureAuth,
    async (req, res) => {

        try {
            const device = await Device.findOne(
                {
                    _id: req.params.id,
                }
            )
            .lean()
            .exec();
    
            if (!device) {
                return res.render('error/404');
            }
    
            if (device.user != req.user.id) {
                res.redirect('/devices');
            } else {
                res.render('devices/edit', 
                    {
                        device,
                    }
                );
            }
        } catch (err) {
            console.log(err);
            return res.render('error/500');
        }

        
    }
);

// @desc Update device
// @route PUT /devices/:id
router.put(
    '/:id', 
    ensureAuth,
    async (req, res) => {

        try {
            let device = await Device.findById(req.params.id).lean().exec();
            if (!device) {
                return res.render('error/404');
            }

            if (device.user != req.user.id) {
                res.redirect('/devices');
            } else {
                device = await Device.findOneAndUpdate(
                    {
                        _id: req.params.id,
                    },
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                res.redirect('/dashboard');
            }

        } catch (err) {
            console.log(err);
            return res.render('error/500');
        }
        
    }
);


// @desc Delete device
// @route DELETE /devices/:id
router.delete(
    '/:id', 
    ensureAuth,
    async (req, res) => {
        try {
            await Device.findByIdAndRemove(req.params.id).lean().exec();
            res.redirect('/dashboard');
        } catch (err) {
            console.log(err);
            return res.render('error/500');
        }
    }
);



// @desc User devices
// @route GET /devices/user/:userId
router.get(
    '/user/:userId', 
    ensureAuth,
    async (req, res) => {
        try {
            
            const devices = await Device.find(
                {
                    user: req.params.userId,
                }
            )
            .populate('user')
            .lean()
            .exec();

            res.render('devices/index',
                {
                    devices,
                }
            )

        } catch (err) {
            console.log(err);
            res.render('error/500');

        }
    }
);


module.exports = router;
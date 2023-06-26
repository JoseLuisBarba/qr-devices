const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../models/User');
const Device = require('../models/Device');








// @desc Show user
// @route GET /users
router.get(
    '/', 
    ensureAuth,
    async (req, res) => {
        try {
            
            console.log(req.user.id);
            const user = await User.findById(req.user.id)
            .lean()
            .exec();

            const numberDevices  = await Device.countDocuments({user: req.user.id}).exec() | 0;



            res.render('users/profile',
                {
                    user,
                    numberDevices
                }
            );
        } catch (err) {
            console.log(err);
            res.render('error/500');
        }
    }
);



// @desc Show edit page
// @route GET /users/edit/:id 
router.get(
    '/edit/:id', 
    ensureAuth,
    async (req, res) => {

        try {
            
            const user = await User.findById(req.user.id)
                .lean()
                .exec();
            
    
            if (!user) {
                return res.render('error/404');
            }
         
    
            if (user._id != req.user.id) {
                res.redirect('users/profile');
            } else {
                res.render('users/edit', 
                    {
                        user,
        
                    }
                );
            }
        } catch (err) {
            console.log(err);
            return res.render('error/500');
        }

        
    }
);



// @desc Update user
// @route PUT /users/:id 
router.put(
    '/:id', 
    ensureAuth,
    async (req, res) => {

        try {
            let user = await User.findById(req.params.id)
                .lean()
                .exec();
            if (!user) {
                return res.render('error/404');
            }

            if (user._id != req.user.id) {
                res.redirect('/users/profile');
            } else {
                user = await User.findOneAndUpdate(
                    {
                        _id: req.params.id,
                    },
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                res.redirect('/users');
            }

        } catch (err) {
            console.log(err);
            return res.render('error/500');
        }
        
    }
);




module.exports = router;




const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../models/User');









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
            console.log(user);

            res.render('users/profile',
                {
                    user,
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



module.exports = router;



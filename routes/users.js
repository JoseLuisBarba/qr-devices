const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const User = require('../models/User');







// @desc Show all stories
// @route GET /users/edit
router.get(
    '/edit', 
    ensureAuth,
    async (req, res) => {
        try {
            
            console.log(req.user.id);
            const user = await User.findById(req.user.id)
            .lean()
            .exec();
            console.log(user);

            res.render('users/edit',
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










module.exports = router;



const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');
const TypeDevice = require('../models/TypeDevice');
const urlsystem = require('../models/urlsystem');


// @desc Show typedevice
// @route GET /typedevices
router.get(
    '/', 
    ensureAuth,
    async (req, res) => {
        try {
            
            
            await TypeDevice.create(
                [
                    {
                        name: "Desktop",
                        image:"/images/devices/desktop.jpg"
                    },
                    {
                        name: "Laptop",
                        image:"/images/devices/laptop.jpg"
                    },
                    {
                        name: "Tablet",
                        image:"/images/devices/tablet.jpg"
                    },
                    {
                        name: "Printer",
                        image:"/images/devices/printer.jpg"
                    },
                ]
            );
            res.render('typedevices/insert');
        } catch (err) {
            console.log(err);
            res.render('error/500');
        }
    }
);






module.exports = router;
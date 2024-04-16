const express = require('express');
const router = express.Router();
const CabDriver = require('../models/user');


// get list of drivers from db
router.get('/cabDriver', function(req, res, next){
    CabDriver.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
                distanceField: "distance",
                maxDistance: 100000,
                spherical: true
            }
        }
    ]).then(function(results) {
        res.send(results);
    }).catch(function(err) {
        res.send(err);
    });

});

// add new driver to db
router.post('/cabDriver', function(req, res, next){
    // new instance and save together
    CabDriver.create(req.body).then(function(driver){
        res.send(driver);
    }).catch(next);
});

// update driver in db
router.put('/cabDriver/:id', function(req, res, next){
    CabDriver.findByIdAndUpdate({_id : req.params.id}, req.body)
    .then(function(){
        CabDriver.findOne({_id : req.params.id}).then(function(driver){
            res.send(driver);
        });
    });
});

// delete driver from db
router.delete('/cabDriver/:id', function(req, res, next){
    CabDriver.findByIdAndDelete({_id : req.params.id})
    .then(function(driver){
        res.send(driver);
    });
});


module.exports = router;
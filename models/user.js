const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// geo-location schema
const geoSchema = new Schema({
    type : {
        type : String,
        default : "Point"
    },
    coordinates : {
        type : [Number],
        index : "2dsphere"
    }
});

// Schema for user
const cabDriverSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    rank : {
        type : String,
    },
    available : {
        type : Boolean,
        default : false,
    },
    geometry : geoSchema
});


// geo-model
const CabDriver = mongoose.model('cabDriver', cabDriverSchema);

module.exports = CabDriver;
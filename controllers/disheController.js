const Dishe = require('../models/dishe');

exports.getAllDishes = (req, res, next) => {
    Dishe.findAll()
        .then(result => {
            res.status(200).json(result);
        })
        .catch( err => console.log('error finding all dishes : ', err.message) );
}
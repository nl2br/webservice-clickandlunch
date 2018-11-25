const express = require('express');
const router = express.Router();
const Joi = require('joi');
// const Dishe = require('../models/dishe');
const disheController = require('../controllers/disheController');

router.get('/', disheController.getAllDishes );

// router.get('/', (req, res) => {
//     Dishe.findAll()
//         .then(result => {
//             let dishes = [];
//             result.forEach(item => {
//                 dishes.push({
//                     id: item.dataValues.id, 
//                     name: item.dataValues.name, 
//                     shop_id: item.dataValues.shop_id, 
//                 });
//             })
//             res.send(dishes);
//         })
//         .catch( err => console.log('error finding all dishes : ', err.message) );
// });

router.get('/:id', (req, res) => {
    let dishe = isIdDisheExist(parseInt(req.params.id))
    if(!dishe) return res.status(404).send("this ID dishe don't exist");
    res.send(dishe);
});

router.post('/', (req, res) => {
    const result = validateDishe(req.body)
    if(result.error){
        let errors = '';
        for(let err of result.error.details){
            errors = err.message + ' ';
        }
        return res.status(400).send(errors);
    }
    const dishe = {
        id: dishes.length + 1,
        name: req.body.name
    };
    dishes.push(dishe);
    res.send(dishe);
});

router.put('/:id', (req, res) => {
    let dishe = isIdDisheExist(parseInt(req.params.id))
    if(!dishe) return res.status(404).send("this ID dishe don't exist");

    const result = validateDishe(req.body)
    if(result.error){
        let errors = '';
        for(let err of result.error.details){
            errors = err.message + ' ';
        }
        return res.status(400).send(errors);
    }

    dishe.name = req.body.name;
    res.send(dishe);
});

router.delete('/:id',(req, res) => {
    let dishe = isIdDisheExist(parseInt(req.params.id))
    if(!dishe) return res.status(404).send("this ID dishe don't exist");

    const index = dishes.indexOf(dishe);
    dishes.splice(index,1);

    res.send(dishe);
});

function validateDishe(dishe) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(dishe, schema);
}

function isIdDisheExist(id) {
    return dishes.find(d => d.id === id);
}

module.exports = router;

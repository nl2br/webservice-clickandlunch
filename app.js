const Logger = require('./logger');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// let logger = new Logger();
// let log = logger.log("Call middleware logger...");
// app.use(log);

const dishes = [
    {id:1, name:'poulet frite'},
    {id:2, name:'homard riz'},
    {id:3, name:'steak haricot'}
];

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/api/dishes', (req, res) => {
    // res.send(req.query) // /api/clients?sortBy=name
    res.send(dishes);
});

app.get('/api/dishes/:id', (req, res) => {
    let dishe = isIdDisheExist(parseInt(req.params.id))
    if(!dishe) return res.status(404).send("this ID dishe don't exist");
    res.send(dishe);
});

app.post('/api/dishes', (req, res) => {
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

app.put('/api/dishes/:id', (req, res) => {
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

app.delete('/api/dishes/:id',(req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
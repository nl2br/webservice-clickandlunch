const express = require('express');
const app = express();

app.use(express.json());

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
    const dishe = dishes.find(d => d.id === parseInt(req.params.id));
    if(!dishe) res.status(404).send("this ID dishe don't exist");
    res.send(dishe);
});

app.post('/api/dishes', (req, res) => {
    if(!req.body.name || req.body.name < 3){
        res.status(400).send('Name is required and have more 3 caracters');
    }
    const dishe = {
        id: dishes.length + 1,
        name: req.body.name
    };
    dishes.push(dishe);
    res.send(dishe);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
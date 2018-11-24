const home = require('./routes/home');
const dishes = require('./routes/dishes');
const express = require('express');
const app = express();

app.use(express.json());

// Router definition
app.use('/api/dishes', dishes);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
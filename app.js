const express = require('express');

const sequelize = require('./utils/database');

const homeRouter = require('./routes');
const dishesRouter = require('./routes/dishes');


// Launch Express
const app = express();
app.use(express.json());

// Router definition
app.use('/', homeRouter);
app.use('/api/dishes', dishesRouter);

// Db connection
sequelize.authenticate()
    .then((err) => {
        console.log('Connection has been established successfully.');
    }, (err) => { 
        console.log('Unable to connect to the database:', err);
    });

// Server launch
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
const express = require('express');

// const sequelize = require('./utils/database');
// const db = require('./models/');

// import routes
const homeRouter = require('./routes');
const dishesRouter = require('./routes/dishes');

// Launch Express
const app = express();
app.use(express.json());

// Router definition
app.use('/', homeRouter);
app.use('/api/dishes', dishesRouter);

// Server launch
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
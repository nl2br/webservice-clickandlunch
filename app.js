const http = require('http');

const express = require('express');

const app = express();

// app.use permet d'ajouter un middleware
app.use((req, res, next) => {
    console.log('in the middleware');
    next(); // permet à la demande (request) de continuer au prochain middleware
})

app.use((req, res, next) => {
    console.log('in another middleware');
    res.send('<h1>Node JS server !</h1>')
})

// for every request launch this function => app
const server = http.createServer(app);

// start the process
server.listen(3000,"127.0.0.1","NodeJS server launch");


/**
 * npm
 * --save-dev // only for developement
 * --save // for all
 */
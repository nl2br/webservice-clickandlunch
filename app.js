const http = require('http');

// for every request launch this function
const server = http.createServer((req,res) => {
    // process.exit(); // stop the server
    res.setHeader('Content-type', 'text/html');
    res.write(`<html><body><h1>hello 1</h1></body></html>`);
    res.end();
});

// start the process
server.listen(3000);


/**
 * npm
 * 
 */
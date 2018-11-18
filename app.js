const http = require('http');

// for every request launch this function
const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit(); // stop the server
    res.setHeader('Content-type', 'text/html');
    res.write(`<html>
        <body>
            <h1>hello</h1>
        </body>
    </html>`);
    res.end();
});

// start the process
server.listen(3000);
// swagger
const swaggerJSDoc = require('swagger-jsdoc');
const port = process.env.PORT || 3000;
const host = 'localhost:' + port;
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Hello i am swagger . I am one step ahead of postman. My job is to provide API description',
  },
  host: host,
  basePath: '/',
};
// options for swagger jsdoc 
const options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ['./routes/*.js', './models/*.js'], // path where API specification are written
};
// initialize swaggerJSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
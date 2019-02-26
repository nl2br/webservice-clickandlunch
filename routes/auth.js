/**
 * Auth Routes
 * @module routes/auth
 * @requires controllers/authController
 */
const express = require('express');
const router = express.Router();
const Auth = require('../controllers/authController');

/**
 * Login route 
 * @method auth/login
 */
router.post('/login', Auth.authenticateUser);

// Logout on the client, simply delete the token

module.exports = router;


/**
 * @swagger
 * securityDefinitions:
 *  JWT:
 *    description: ""
 *    type: "apiKey"
 *    name: "x-auth-token"
 *    in: "header" 
 * securitySchemes:
 *  appAuth:            
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT   
 */
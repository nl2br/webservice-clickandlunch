/**
 * Auth Routes
 * @module routes/auth
 * @requires controllers/authController
 */
const express = require('express');
const router = express.Router();
const Auth = require('../controllers/authController');
const asyncMiddleware = require('../middleware/async');

/**
 * Login route 
 * @method auth/login
 */
router.post('/login', asyncMiddleware(Auth.authenticateUser));

/**
 * Verifying user token route 
 * @method auth/me
 */
// router.get('/me', [auth, role('VENDOR', 'ADMIN')], Auth.authenticateMe);
router.get('/me', asyncMiddleware(Auth.authenticateMe));

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
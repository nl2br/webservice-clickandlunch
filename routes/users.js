/**
 * Users Routes
 * @module routes/users
 * @requires controllers/userController
 */
const express = require('express');
const router = express.Router();
const Users = require('../controllers/userController');

/**
 * Create a new user 
 * @method post/users
 */
router.post('/', Users.postUser);


module.exports = router;

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - User
 *     description: Create a new User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         properties:
 *           firstname:
 *             type: string
 *           lastname:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       201:
 *         description: Return saved User
 *         schema:
 *            properties:
 *               userId:
 *                 type: number
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               email:
 *                 type: string
 *       400:
 *         description: Internal error
 */
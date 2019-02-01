const express = require('express');
const router = express.Router();

// validation input
const Joi = require('joi');

// Require controllers modules
const productController = require('../controllers/productController');

// Request for list of all product items.
// GET /products 
router.get('/', productController.getProducts);

// Request product from the given id.
// GET /products/:productid
router.get('/:id', (req, res) => {
  let product = isIdproductExist(parseInt(req.params.id))
  if (!product) return res.status(404).send("this ID product don't exist");
  res.send(product);
});

// router.post('/', (req, res) => {
//   const result = validateproduct(req.body)
//   if (result.error) {
//     let errors = '';
//     for (let err of result.error.details) {
//       errors = err.message + ' ';
//     }
//     return res.status(400).send(errors);
//   }
//   const product = {
//     id: products.length + 1,
//     name: req.body.name
//   };
//   products.push(product);
//   res.send(product);
// });

// router.put('/:id', (req, res) => {
//   let product = isIdproductExist(parseInt(req.params.id))
//   if (!product) return res.status(404).send("this ID product don't exist");

//   const result = validateproduct(req.body)
//   if (result.error) {
//     let errors = '';
//     for (let err of result.error.details) {
//       errors = err.message + ' ';
//     }
//     return res.status(400).send(errors);
//   }

//   product.name = req.body.name;
//   res.send(product);
// });

// router.delete('/:id', (req, res) => {
//   let product = isIdproductExist(parseInt(req.params.id))
//   if (!product) return res.status(404).send("this ID product don't exist");

//   const index = products.indexOf(product);
//   products.splice(index, 1);

//   res.send(product);
// });

// function validateproduct(product) {
//   const schema = {
//     name: Joi.string().min(3).required()
//   };
//   return Joi.validate(product, schema);
// }

// function isIdproductExist(id) {
//   return products.find(d => d.id === id);
// }

module.exports = router;

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Product
 *     description: Save product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: Product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Return saved product
 *         schema:
 *           $ref: '#/definitions/Product'
 */
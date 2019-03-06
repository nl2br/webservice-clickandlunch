/* schemas.js */

const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.number().integer().required()
});

const pageSchema = Joi.object({
  page: Joi.number().integer().required()
});

const getShopsSchema = Joi.object({
  page: Joi.number().integer(),
  range: Joi.number().integer(),
  lat: Joi.number(),
  lon: Joi.number(),
  name: Joi.string().min(3).max(30)
});

const getShopsByCategorySchema = Joi.object({
  page: Joi.number().integer().required(),
  idCategory: Joi.number().integer().required()
});

const getShopProductsSchema = Joi.object({
  shopid: Joi.number().integer().required(),
  productid: Joi.number().integer().required()
});

const postShopSchema = Joi.object({
  categories: Joi.array().items(Joi.number())
}).options({ allowUnknown: true }); // permet de ne pas prendre en compte tous les éléments

// export the schemas
module.exports = {
  "get/shops/:id": idSchema,
  "delete/shops/:id": idSchema,
  "get/shops/": getShopsSchema,
  "post/shops/": postShopSchema,
  "get/shops/p/:page": pageSchema,
  "get/shops/p/:page/category/:idCategory": getShopsByCategorySchema,
  "get/shops/:id/products": idSchema,
  "get/shops/:shopid/products/:productid": getShopProductsSchema,
};

// name: Joi.string().required(),
// siret: Joi.string().min(14).max(14).alphanum().required(),
// siren: Joi.string().min(9).max(9).alphanum().required(),
// phoneNumber: Joi.string().regex(/(0|\\+33|0033)[1-9][0-9]{8}/).required(),
// email: Joi.string().email().required(),
// longitude: Joi.number().min(-180).max(180).required(),
// latitude: Joi.number().min(-180).max(180).required(),
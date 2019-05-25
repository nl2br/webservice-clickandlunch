/* schemas.js */

const Joi = require('joi');

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
  id: Joi.number().integer().required(),
  productid: Joi.number().integer().required()
});


const productOrder = Joi.object().keys({
  id: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
});

const postOrdersSchema = Joi.object({
  products: Joi.array().items(productOrder)
});

const postProductSchema = Joi.object({
  name: Joi.required(),
  description: Joi.required(),
  price: Joi.number().required(),
  productType: Joi.string().valid(['STARTER','DISH','DESSERT','DRINK','OTHER','MENU']).required()
}).options({ allowUnknown: true }); // permet de ne pas prendre en compte tous les éléments

const postShopSchema = Joi.object({
  name: Joi.required(),
  address: Joi.required(),
  city: Joi.required(),
  postalCode: Joi.required(),
  siret: Joi.required(),
  siren: Joi.required(),
  phoneNumber: Joi.required(),
  email: Joi.required(),
  longitude: Joi.required(),
  latitude: Joi.required(),
  categories: Joi.array().items(Joi.number())
}).options({ allowUnknown: true }); // permet de ne pas prendre en compte tous les éléments

const postCustomerSchema = Joi.object({
  firstname: Joi.required(),
  lastname: Joi.required(),
  phoneNumber: Joi.required(),
  email: Joi.required(),
  password: Joi.required(),
  role: Joi.string().valid('CUSTOMER').required()
}).options({ allowUnknown: true }); // permet de ne pas prendre en compte tous les éléments

// export the schemas
module.exports = {
  'get/products/:id': idSchema,
  'post/products/shops/:id': postProductSchema,
  'get/customers/:id': idSchema,
  'post/customers/': postCustomerSchema,
  'get/shops/:id': idSchema,
  'delete/shops/:id': idSchema,
  'get/shops/': getShopsSchema,
  'post/shops/': postShopSchema,
  'get/shops/p/:page': pageSchema,
  'get/shops/p/:page/category/:idCategory': getShopsByCategorySchema,
  'get/shops/:id/products': idSchema,
  'get/shops/:id/products/:productid': getShopProductsSchema,
  'get/orders/customers/:id': idSchema,
  'post/orders/shops/:idShop/customers/:idCustomer': postOrdersSchema,
};

// name: Joi.string().required(),
// siret: Joi.string().min(14).max(14).alphanum().required(),
// siren: Joi.string().min(9).max(9).alphanum().required(),
// phoneNumber: Joi.string().regex(/(0|\\+33|0033)[1-9][0-9]{8}/).required(),
// email: Joi.string().email().required(),
// longitude: Joi.number().min(-180).max(180).required(),
// latitude: Joi.number().min(-180).max(180).required(),
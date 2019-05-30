const _ = require('lodash');
const Joi = require('joi');
const Schemas = require('../schemas/schemas');

module.exports = (methodCall, controller) => {

  // return the validation middleware
  return (req, res, next) => {
    const route = methodCall + '/' + controller + req.route.path;
    const method = req.method.toLowerCase();

    if (_.has(Schemas, route)) {
      // get schema for the current route
      const schema = _.get(Schemas, route);

      if (schema) {
        if(method === 'put' || method === 'post'){
          return Joi.validate(req.body, schema, (error, data) => {
            if (error) {
              const err = new Error(error.details[0].message);
              err.status = 400;
              next(err);
            } else {
              // Replace req.body with the data after Joi validation
              req.body = data;
              next();
            }
          });
        }else{
          // if req.query has properties, validate them
          if(Object.keys(req.query).length !== 0){
            return Joi.validate(req.query, schema, (error, data) => {
              if (error) {
                const err = new Error(error.details[0].message);
                err.status = 400;
                next(err);
              } else {
                // Replace req.body with the data after Joi validation
                req.body = data;
                next();
              }
            });
          }
          // if req.params has properties, validate them
          if(Object.keys(req.params).length !== 0){
            return Joi.validate(req.params, schema, (error, data) => {
              if (error) {
                const err = new Error(error.details[0].message);
                err.status = 400;
                next(err);
              } else {
                // Replace req.body with the data after Joi validation
                req.body = data;
                next();
              }
            });
          }
        }
      }
    }
    next();
  };
};

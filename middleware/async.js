
/**
 * asyncMiddleware
 * Externalize try catch 
 * is used on route function call
 */
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    }
    catch(ex) {
      console.log('EXPRESS HANDLER ERROR ASYNC/AWAIT');
      next(ex);
    }
  };
};




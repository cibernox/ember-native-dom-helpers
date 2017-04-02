/* eslint-env node */
/* eslint-disable new-cap */
module.exports = function(app) {
  let express = require('express');
  let signupRouter = express.Router();

  signupRouter.post('/', function(req, res) {
    setTimeout(function() {
      res.send({
        data: {
          id: 1,
          type: 'users',
          attributes: {
            email: 'foo@bar.baz'
          }
        }
      });
    }, 300);
  });

  // app.use('/signup', require('body-parser').json());
  app.use('/signup', signupRouter);
};

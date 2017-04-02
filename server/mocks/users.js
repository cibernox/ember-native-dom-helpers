/* eslint-env node */
/* eslint-disable new-cap */
module.exports = function(app) {
  let express = require('express');
  let usersRouter = express.Router();

  usersRouter.get('/:id', function(req, res) {
    setTimeout(function() {
      res.send({
        data: {
          id: req.params.id,
          type: 'users',
          attributes: {
            email: 'foo@bar.baz'
          }
        }
      });
    }, 300);
  });

  app.use('/users', usersRouter);
};

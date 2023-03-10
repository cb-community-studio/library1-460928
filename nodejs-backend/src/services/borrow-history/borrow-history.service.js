const { Borrow-history } = require('./borrow-history.class');
const createModel = require('../../models/borrow-history.model');
const hooks = require('./borrow-history.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/borrow-history', new Borrow-history(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('borrow-history');

  service.hooks(hooks);
};
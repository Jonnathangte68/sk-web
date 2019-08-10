'use strict';
module.exports = function(app) {
  var laborumExperticeCtrl = require('../controllers/laborumExperticeController');

  // todoList Routes
  app.route('/laborumexpertices')
    .get(laborumExperticeCtrl.list_all_LaborumExpertice)
    .post(laborumExperticeCtrl.create_a_LaborumExpertice);


  app.route('/laborumexpertices/:LaborumExperticeId')
    .get(laborumExperticeCtrl.read_a_LaborumExpertice)
    .put(laborumExperticeCtrl.update_a_LaborumExpertice)
    .delete(laborumExperticeCtrl.delete_a_LaborumExpertice);
};

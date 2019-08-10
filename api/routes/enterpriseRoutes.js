'use strict';
module.exports = function(app) {
  var enterpriseCtrl = require('../controllers/enterpriseController');

  // todoList Routes
  app.route('/enterprises')
    .get(enterpriseCtrl.list_all_Enterprise)
    .post(enterpriseCtrl.create_a_Enterprise);


  app.route('/enterprises/:EnterpriseId')
    .get(enterpriseCtrl.read_a_Enterprise)
    .put(enterpriseCtrl.update_a_Enterprise)
    .delete(enterpriseCtrl.delete_a_Enterprise);
};

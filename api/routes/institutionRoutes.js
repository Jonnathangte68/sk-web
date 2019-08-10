'use strict';
module.exports = function(app) {
  var institutionCtrl = require('../controllers/institutionController');

  // todoList Routes
  app.route('/institutions')
    .get(institutionCtrl.list_all_Institution)
    .post(institutionCtrl.create_a_Institution);


  app.route('/institutions/:InstitutionId')
    .get(institutionCtrl.read_a_Institution)
    .put(institutionCtrl.update_a_Institution)
    .delete(institutionCtrl.delete_a_Institution);
};

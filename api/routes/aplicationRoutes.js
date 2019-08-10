'use strict';
module.exports = function(app) {
  var aplicationCtrl = require('../controllers/aplicationController');

  // todoList Routes
  app.route('/aplications')
    .get(aplicationCtrl.list_all_Aplication)
    .post(aplicationCtrl.create_a_Aplication);

  app.route('/job_already_apply')
    .get(aplicationCtrl.get_status_new_application);

    app.route('/aplications2')
    .post(aplicationCtrl.create_a_Aplication2);

  app.route('/aplications/:AplicationId')
    .get(aplicationCtrl.read_a_Aplication)
    .put(aplicationCtrl.update_a_Aplication)
    .delete(aplicationCtrl.delete_a_Aplication);
};

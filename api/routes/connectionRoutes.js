'use strict';
module.exports = function(app) {
  var aplicationCtrl = require('../controllers/connectionController');

  // todoList Routes
  app.route('/connections')
    .get(aplicationCtrl.list_all_Connection)
    .post(aplicationCtrl.create_a_Connection);

  app.route('/connections_by_user')
      .post(aplicationCtrl.list_all_user_conects);

  app.route('/suggestions_by_user')
      .post(aplicationCtrl.list_all_user_suggestions);

  app.route('/connections/:ConnectionId')
    .get(aplicationCtrl.read_a_Connection)
    .put(aplicationCtrl.update_a_Connection)
    .delete(aplicationCtrl.delete_a_Connection);
};

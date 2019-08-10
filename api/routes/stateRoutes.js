'use strict';
module.exports = function(app) {
  var stateCtrl = require('../controllers/stateController');

  // todoList Routes
  app.route('/states')
    .get(stateCtrl.list_all_State)
    .post(stateCtrl.create_a_State);


  app.route('/states/:StateId')
    .get(stateCtrl.read_a_State)
    .put(stateCtrl.update_a_State)
    .delete(stateCtrl.delete_a_State);
};

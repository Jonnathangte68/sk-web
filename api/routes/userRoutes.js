'use strict';
module.exports = function(app) {
  var userCtrl = require('../controllers/userController');

  // todoList Routes
  app.route('/users')
    .get(userCtrl.list_all_User)
    .post(userCtrl.create_a_User);


  app.route('/user/:UserId')
    .get(userCtrl.read_a_User)
    .put(userCtrl.update_a_User)
    .delete(userCtrl.delete_a_User);
};

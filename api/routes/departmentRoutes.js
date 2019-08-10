'use strict';
module.exports = function(app) {
  var departmentController = require('../controllers/departmentController');

  // todoList Routes
  app.route('/departments')
    .get(departmentController.list_all_Department)
    .post(departmentController.create_a_Department);


  app.route('/departments/:DepartmentId')
    .get(departmentController.read_a_Department)
    .put(departmentController.update_a_Department)
    .delete(departmentController.delete_a_Department);
};

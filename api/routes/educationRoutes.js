'use strict';
module.exports = function(app) {
  var educationTypeCtrl = require('../controllers/educationController');

  // todoList Routes
  app.route('/educations')
    .get(educationTypeCtrl.list_all_Education)
    .post(educationTypeCtrl.create_a_Education);


  app.route('/educations/:EducationId')
    .get(educationTypeCtrl.read_a_Education)
    .put(educationTypeCtrl.update_a_Education)
    .delete(educationTypeCtrl.delete_a_Education);
};

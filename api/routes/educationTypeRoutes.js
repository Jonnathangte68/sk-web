'use strict';
module.exports = function(app) {
  var educationTypeCtrl = require('../controllers/educationTypeController');

  // todoList Routes
  app.route('/educationtypes')
    .get(educationTypeCtrl.list_all_EducationType)
    .post(educationTypeCtrl.create_a_EducationType);


  app.route('/educationtypes/:EducationTypeId')
    .get(educationTypeCtrl.read_a_EducationType)
    .put(educationTypeCtrl.update_a_EducationType)
    .delete(educationTypeCtrl.delete_a_EducationType);
};

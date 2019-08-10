'use strict';
module.exports = function(app) {
  var recruiterTypeCtrl = require('../controllers/recruiterTypeController');

  // todoList Routes
  app.route('/recruitertypes')
    .get(recruiterTypeCtrl.list_all_RecruiterType)
    .post(recruiterTypeCtrl.create_a_RecruiterType);


  app.route('/recruitertypes/:RecruiterTypeId')
    .get(recruiterTypeCtrl.read_a_RecruiterType)
    .put(recruiterTypeCtrl.update_a_RecruiterType)
    .delete(recruiterTypeCtrl.delete_a_RecruiterType);
};

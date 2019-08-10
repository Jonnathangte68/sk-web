'use strict';
module.exports = function(app) {
  var recruiterCtrl = require('../controllers/recruiterController');

  // todoList Routes
  app.route('/recruiters')
    .get(recruiterCtrl.list_all_Recruiter)
    .post(recruiterCtrl.create_a_Recruiter);

  app.route('/recruiter_x_user')
    .get(recruiterCtrl.read_recruiter_by_user);

  app.route('/recruiters/:RecruiterId')
    .get(recruiterCtrl.read_a_Recruiter)
    .put(recruiterCtrl.update_a_Recruiter)
    .delete(recruiterCtrl.delete_a_Recruiter);
};

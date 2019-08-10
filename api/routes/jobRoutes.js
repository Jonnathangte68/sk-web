'use strict';
module.exports = function(app) {
  var jobController = require('../controllers/jobController');

  // todoList Routes
  app.route('/jobs')
    .get(jobController.list_all_Job)
    .post(jobController.create_a_Job);

app.route('/jobs_for_usr')
.get(jobController.list_jobs_for_usr);

app.route('/get_jobs_by_subcategories')
    .get(jobController.list_all_by_category);

  app.route('/jobs/:JobId')
    .get(jobController.read_a_Job)
    .put(jobController.update_a_Job)
    .delete(jobController.delete_a_Job);
};
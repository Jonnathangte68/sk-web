'use strict';
module.exports = function(app) {
  var jobTypeController = require('../controllers/jobTypeController');

  // todoList Routes
  app.route('/jobtypes')
    .get(jobTypeController.list_all_JobType)
    .post(jobTypeController.create_a_JobType);


  app.route('/jobtypes/:JobTypeId')
    .get(jobTypeController.read_a_JobType)
    .put(jobTypeController.update_a_JobType)
    .delete(jobTypeController.delete_a_JobType);
};
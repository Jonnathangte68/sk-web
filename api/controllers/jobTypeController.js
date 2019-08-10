'use strict';
var mongoose = require('mongoose'),
  JobType = mongoose.model('JobType');
exports.list_all_JobType = function(req, res) {
  JobType.find({}, function(err, JobType) {
    if (err)
      res.send(err);
    res.json(JobType);
  });
};
exports.create_a_JobType = function(req, res) {
  var new_JobType = new JobType(req.body);
  new_JobType.save(function(err, JobType) {
    if (err)
      res.send(err);
    res.json(JobType);
  });
};
exports.read_a_JobType = function(req, res) {
  JobType.findById(req.params.JobTypeId, function(err, JobType) {
    if (err)
      res.send(err);
    res.json(JobType);
  });
};
exports.update_a_JobType = function(req, res) {
  JobType.findOneAndUpdate({_id: req.params.JobTypeId}, req.body, {new: true}, function(err, JobType) {
    if (err)
      res.send(err);
    res.json(JobType);
  });
};
exports.delete_a_JobType = function(req, res) {
  JobType.remove({
    _id: req.params.JobTypeId
  }, function(err, JobType) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

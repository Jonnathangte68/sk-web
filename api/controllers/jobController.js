'use strict';
var mongoose = require('mongoose'),
  Job = mongoose.model('Job');
exports.list_all_Job = function(req, res) {
  Job.find({}, function(err, Job) {
    if (err)
      res.send(err);
    res.json(Job);
  });
};
exports.list_all_Job_for_user = function(req, res) {
  Job.find({representant:req.params.u}, function(err, Job) {
    if (err)
      res.send(err);
    res.json(Job);
  });
};
exports.list_all_by_category = function(req, res) {
    Job.find({subcategory:req.params.subcategory_id}, function(err, Job) {
      if (err)
        res.send(err);
      res.json(Job);
    });
};
exports.create_a_Job = function(req, res) {
  var new_Job = new Job(req.body);
  new_Job.save(function(err, Job) {
    if (err)
      res.send(err);
    res.json(Job);
  });
};
exports.read_a_Job = function(req, res) {
  Job.findById(req.params.JobId, function(err, Job) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (err)
      res.send(err);
    res.json(Job);
  });
};
exports.update_a_Job = function(req, res) {
  Job.findOneAndUpdate({_id: req.params.JobId}, req.body, {new: true}, function(err, Job) {
    if (err)
      res.send(err);
    res.json(Job);
  });
};
exports.delete_a_Job = function(req, res) {
  Job.remove({
    _id: req.params.JobId
  }, function(err, Job) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
exports.list_jobs_for_usr = function(req,res) {
  Job.find({representant:req.query.u}, function(err, Job) {
    if (err)
      res.send(err);
    res.json(Job);
  });
};

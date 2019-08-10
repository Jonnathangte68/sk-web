'use strict';
var mongoose = require('mongoose'),
  RecruiterType = mongoose.model('RecruiterType');
exports.list_all_RecruiterType = function(req, res) {
  RecruiterType.find({}, function(err, RecruiterType) {
    if (err)
      res.send(err);
    res.json(RecruiterType);
  });
};
exports.create_a_RecruiterType = function(req, res) {
  var new_RecruiterType = new RecruiterType(req.body);
  new_RecruiterType.save(function(err, RecruiterType) {
    if (err)
      res.send(err);
    res.json(RecruiterType);
  });
};
exports.read_a_RecruiterType = function(req, res) {
  RecruiterType.findById(req.params.RecruiterTypeId, function(err, RecruiterType) {
    if (err)
      res.send(err);
    res.json(RecruiterType);
  });
};
exports.update_a_RecruiterType = function(req, res) {
  RecruiterType.findOneAndUpdate({_id: req.params.RecruiterTypeId}, req.body, {new: true}, function(err, RecruiterType) {
    if (err)
      res.send(err);
    res.json(RecruiterType);
  });
};
exports.delete_a_RecruiterType = function(req, res) {
  RecruiterType.remove({
    _id: req.params.RecruiterTypeId
  }, function(err, RecruiterType) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

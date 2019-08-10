'use strict';
var mongoose = require('mongoose'),
  Enterprise = mongoose.model('Enterprise');
exports.list_all_Enterprise = function(req, res) {
  Enterprise.find({}, function(err, Enterprise) {
    if (err)
      res.send(err);
    res.json(Enterprise);
  });
};
exports.create_a_Enterprise = function(req, res) {
  var new_Enterprise = new Enterprise(req.body);
  new_Enterprise.save(function(err, Enterprise) {
    if (err)
      res.send(err);
    res.json(Enterprise);
  });
};
exports.read_a_Enterprise = function(req, res) {
  Enterprise.findById(req.params.EnterpriseId, function(err, Enterprise) {
    if (err)
      res.send(err);
    res.json(Enterprise);
  });
};
exports.update_a_Enterprise = function(req, res) {
  Enterprise.findOneAndUpdate({_id: req.params.EnterpriseId}, req.body, {new: true}, function(err, Enterprise) {
    if (err)
      res.send(err);
    res.json(Enterprise);
  });
};
exports.delete_a_Enterprise = function(req, res) {
  Enterprise.remove({
    _id: req.params.EnterpriseId
  }, function(err, Enterprise) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

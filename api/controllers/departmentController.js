'use strict';
var mongoose = require('mongoose'),
  Department = mongoose.model('Department');
exports.list_all_Department = function(req, res) {
  Department.find({}, function(err, Department) {
    if (err)
      res.send(err);
    res.json(Department);
  });
};
exports.create_a_Department = function(req, res) {
  var new_Department = new Department(req.body);
  Department.save(function(err, Department) {
    if (err)
      res.send(err);
    res.json(Department);
  });
};
exports.read_a_Department = function(req, res) {
  Department.findById(req.params.DepartmentId, function(err, Department) {
    if (err)
      res.send(err);
    res.json(Department);
  });
};
exports.update_a_Department = function(req, res) {
  Department.findOneAndUpdate({_id: req.params.DepartmentId}, req.body, {new: true}, function(err, Department) {
    if (err)
      res.send(err);
    res.json(Department);
  });
};
exports.delete_a_Department = function(req, res) {
  Department.remove({
    _id: req.params.DepartmentId
  }, function(err, Department) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

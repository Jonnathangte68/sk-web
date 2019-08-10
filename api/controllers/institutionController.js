'use strict';
var mongoose = require('mongoose'),
  Institution = mongoose.model('Institution');
exports.list_all_Institution = function(req, res) {
  Institution.find({}, function(err, Institution) {
    if (err)
      res.send(err);
    res.json(Institution);
  });
};
exports.create_a_Institution = function(req, res) {
  var new_Institution = new Institution(req.body);
  new_Institution.save(function(err, Institution) {
    if (err)
      res.send(err);
    res.json(Institution);
  });
};
exports.read_a_Institution = function(req, res) {
  Institution.findById(req.params.InstitutionId, function(err, Institution) {
    if (err)
      res.send(err);
    res.json(Institution);
  });
};
exports.update_a_Institution = function(req, res) {
  Institution.findOneAndUpdate({_id: req.params.InstitutionId}, req.body, {new: true}, function(err, Institution) {
    if (err)
      res.send(err);
    res.json(Institution);
  });
};
exports.delete_a_Institution = function(req, res) {
  Institution.remove({
    _id: req.params.InstitutionId
  }, function(err, Institution) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

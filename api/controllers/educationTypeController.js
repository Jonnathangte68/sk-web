'use strict';
var mongoose = require('mongoose'),
  EducationType = mongoose.model('EducationType');
exports.list_all_EducationType = function(req, res) {
  EducationType.find({}, function(err, EducationType) {
    if (err)
      res.send(err);
    res.json(EducationType);
  });
};
exports.create_a_EducationType = function(req, res) {
  var new_EducationType = new EducationType(req.body);
  new_EducationType.save(function(err, EducationType) {
    if (err)
      res.send(err);
    res.json(EducationType);
  });
};
exports.read_a_EducationType = function(req, res) {
  EducationType.findById(req.params.EducationTypeId, function(err, EducationType) {
    if (err)
      res.send(err);
    res.json(EducationType);
  });
};
exports.update_a_EducationType = function(req, res) {
  EducationType.findOneAndUpdate({_id: req.params.EducationTypeId}, req.body, {new: true}, function(err, EducationType) {
    if (err)
      res.send(err);
    res.json(EducationType);
  });
};
exports.delete_a_EducationType = function(req, res) {
  EducationType.remove({
    _id: req.params.EducationTypeId
  }, function(err, EducationType) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

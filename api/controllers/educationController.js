'use strict';
var mongoose = require('mongoose'),
  Education = mongoose.model('Education'),
  Talent = mongoose.model('Talent');
exports.list_all_Education = function(req, res) {
  Education.find({}, function(err, Education) {
    if (err)
      res.send(err);
    res.json(Education);
  });
};
exports.create_a_Education = function(req, res) {
  var new_Education = new Education(req.body);
  new_Education.save(function(err, Education) {
    if (err)
      res.send(err);
    Talent.findOne({'_id':Education.talent}, function(error,Talent) {
        Talent.education.push(Education._id);
        Talent.save();
        res.json(Education);
      });
    });
};
exports.read_a_Education = function(req, res) {
  Education.findById(req.params.EducationId, function(err, Education) {
    if (err)
      res.send(err);
    res.json(Education);
  });
};
exports.update_a_Education = function(req, res) {
  Education.findOneAndUpdate({_id: req.params.EducationId}, req.body, {new: true}, function(err, Education) {
    if (err)
      res.send(err);
    res.json(Education);
  });
};
exports.delete_a_Education = function(req, res) {
  Education.remove({
    _id: req.params.EducationId
  }, function(err, Education) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

'use strict';
var mongoose = require('mongoose'),
  Talent = mongoose.model('Talent');
exports.list_all_Talent = function(req, res) {
  Talent.find({}, function(err, Talent) {
    if (err)
      res.send(err);
    res.json(Talent);
  });
};
exports.create_a_Talent = function(req, res) {
  var new_Talent = new Talent(req.body);
  new_Talent.save(function(err, Talent) {
    if (err)
      res.send(err);
    res.json(Talent);
  });
};
exports.read_a_Talent = function(req, res) {
  Talent.findById(req.params.TalentId, function(err, Talent) {
    if (err)
      res.send(err);
    res.json(Talent);
  });
};
exports.update_a_Talent = function(req, res) {
  Talent.findOneAndUpdate({_id: req.params.TalentId}, req.body, {new: true}, function(err, Talent) {
    if (err)
      res.send(err);
    res.json(Talent);
  });
};
exports.delete_a_Talent = function(req, res) {
  Talent.remove({
    _id: req.params.TalentId
  }, function(err, Talent) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

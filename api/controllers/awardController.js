'use strict';
var mongoose = require('mongoose'),
  Award = mongoose.model('Award'),
  Talent = mongoose.model('Talent');
exports.list_all_Award = function(req, res) {
  Award.find({}, function(err, Award) {
    if (err)
      res.send(err);
    res.json(Award);
  });
};
exports.create_a_Award = function(req, res) {
  var new_Award = new Award(req.body);
  new_Award.save(function(err, Award) {
    if (err)
      res.send(err);
    Talent.findOne({'_id':Award.talent}, function(error,Talent) {
        Talent.awards.push(Award._id);
        Talent.save();
        res.json(Award);
      });
  });
};
exports.read_a_Award = function(req, res) {
  Award.findById(req.params.AwardId, function(err, Award) {
    if (err)
      res.send(err);
    res.json(Award);
  });
};
exports.update_a_Award = function(req, res) {
  Award.findOneAndUpdate({_id: req.params.AwardId}, req.body, {new: true}, function(err, Award) {
    if (err)
      res.send(err);
    res.json(Award);
  });
};
exports.delete_a_Award = function(req, res) {
  Award.remove({
    _id: req.params.AwardId
  }, function(err, Award) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

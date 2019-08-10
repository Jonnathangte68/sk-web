'use strict';
var mongoose = require('mongoose'),
  LaborumExpertice = mongoose.model('LaborumExpertice'),
  Talent = mongoose.model('Talent');
exports.list_all_LaborumExpertice = function(req, res) {
  LaborumExpertice.find({}, function(err, LaborumExpertice) {
    if (err)
      res.send(err);
    res.json(LaborumExpertice);
  });
};
exports.create_a_LaborumExpertice = function(req, res) {
  var new_LaborumExpertice = new LaborumExpertice(req.body);
  new_LaborumExpertice.save(function(err, LaborumExpertice) {
    if (err)
      res.send(err);
    Talent.findOne({'_id':LaborumExpertice.talent}, function(error,Talent) {
        Talent.expertice.push(LaborumExpertice._id);
        Talent.save();
        res.json(LaborumExpertice);
      });
  });
};
exports.read_a_LaborumExpertice = function(req, res) {
  LaborumExpertice.findById(req.params.LaborumExperticeId, function(err, LaborumExpertice) {
    if (err)
      res.send(err);
    res.json(LaborumExpertice);
  });
};
exports.update_a_LaborumExpertice = function(req, res) {
  LaborumExpertice.findOneAndUpdate({_id: req.params.LaborumExperticeId}, req.body, {new: true}, function(err, LaborumExpertice) {
    if (err)
      res.send(err);
    res.json(LaborumExpertice);
  });
};
exports.delete_a_LaborumExpertice = function(req, res) {
  LaborumExpertice.remove({
    _id: req.params.LaborumExperticeId
  }, function(err, LaborumExpertice) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

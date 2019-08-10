'use strict';
var mongoose = require('mongoose'),
  Hidden = mongoose.model('Hidden');
exports.list_all_Hidden = function(req, res) {
  Hidden.find({}, function(err, Hidden) {
    if (err)
      res.send(err);
    res.json(Hidden);
  });
};
exports.create_a_Hidden = function(req, res) {
  var new_Hidden = new Hidden(req.body);
  new_Hidden.save(function(err, Hidden) {
    if (err)
      res.send(err);
    res.json(Hidden);
  });
};
exports.read_a_Hidden = function(req, res) {
  Hidden.findOne({mask: req.params.HiddenId}, function(err, Hidden) {
    if (err)
      res.send(err);
    res.json(Hidden);
  });
};
exports.update_a_Hidden = function(req, res) {
  Hidden.findOneAndUpdate({_id: req.params.HiddenId}, req.body, {new: true}, function(err, Hidden) {
    if (err)
      res.send(err);
    res.json(Hidden);
  });
};
exports.delete_a_Hidden = function(req, res) {
  Hidden.remove({
    _id: req.params.HiddenId
  }, function(err, Hidden) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

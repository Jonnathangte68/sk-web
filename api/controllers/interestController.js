'use strict';
var mongoose = require('mongoose'),
  Interest = mongoose.model('Interest');
exports.list_all_Interest = function(req, res) {
  Interest.find({}, function(err, Interest) {
    if (err)
      res.send(err);
    res.json(Interest);
  });
};
exports.create_a_Interest = function(req, res) {
  var new_Interest = new Interest(req.body);
  new_Interest.save(function(err, Interest) {
    if (err)
      res.send(err);
    res.json(Interest);
  });
};
exports.read_a_Interest = function(req, res) {
  Interest.findById(req.params.InterestId, function(err, Interest) {
    if (err)
      res.send(err);
    res.json(Interest);
  });
};
exports.update_a_Interest = function(req, res) {
  Interest.findOneAndUpdate({_id: req.params.InterestId}, req.body, {new: true}, function(err, Interest) {
    if (err)
      res.send(err);
    res.json(Interest);
  });
};
exports.delete_a_Interest = function(req, res) {
  Interest.remove({
    _id: req.params.InterestId
  }, function(err, country) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

'use strict';
var mongoose = require('mongoose'),
  Follower = mongoose.model('Follower');
exports.list_all_Follower = function(req, res) {
  Follower.find({}, function(err, Follower) {
    if (err)
      res.send(err);
    res.json(Follower);
  });
};
exports.create_a_Follower = function(req, res) {
  var new_Follower = new Follower(req.body);
  new_Follower.save(function(err, Follower) {
    if (err)
      res.send(err);
    res.json(Follower);
  });
};
exports.read_a_Follower = function(req, res) {
  Follower.findById(req.params.FollowerId, function(err, Follower) {
    if (err)
      res.send(err);
    res.json(Follower);
  });
};
exports.update_a_Follower = function(req, res) {
  Follower.findOneAndUpdate({_id: req.params.FollowerId}, req.body, {new: true}, function(err, Follower) {
    if (err)
      res.send(err);
    res.json(Follower);
  });
};
exports.delete_a_Follower = function(req, res) {
  Follower.remove({
    _id: req.params.FollowerId
  }, function(err, Follower) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

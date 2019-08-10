'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User');
exports.list_all_User = function(req, res) {
  User.find({}, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};
exports.create_a_User = function(req, res) {
  var new_User = new User(req.body);
  new_User.save(function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};
exports.read_a_User = function(req, res) {
  User.findById(req.params.UserId, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};
exports.update_a_User = function(req, res) {
  User.findOneAndUpdate({_id: req.params.User}, req.body, {new: true}, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};
exports.delete_a_User = function(req, res) {
  User.remove({
    _id: req.params.UserId
  }, function(err, User) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

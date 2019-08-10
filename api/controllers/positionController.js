'use strict';
var mongoose = require('mongoose'),
  Position = mongoose.model('Position');
exports.list_all_Position = function(req, res) {
  Position.find({}, function(err, Position) {
    if (err)
      res.send(err);
    res.json(Position);
  });
};
exports.create_a_Position = function(req, res) {
  var new_Position = new Position(req.body);
  new_Position.save(function(err, Position) {
    if (err)
      res.send(err);
    res.json(Position);
  });
};
exports.read_a_Position = function(req, res) {
  Position.findById(req.params.PositionId, function(err, Position) {
    if (err)
      res.send(err);
    res.json(Position);
  });
};
exports.update_a_Position = function(req, res) {
  Position.findOneAndUpdate({_id: req.params.PositionId}, req.body, {new: true}, function(err, Position) {
    if (err)
      res.send(err);
    res.json(Position);
  });
};
exports.delete_a_Position = function(req, res) {
  Position.remove({
    _id: req.params.PositionId
  }, function(err, Position) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

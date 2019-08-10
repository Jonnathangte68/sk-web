'use strict';
var mongoose = require('mongoose'),
  Level = mongoose.model('Level');
exports.list_all_Level = function(req, res) {
  Level.find({}, function(err, Level) {
    if (err)
      res.send(err);
    res.json(Level);
  });
};
exports.create_a_Level = function(req, res) {
  var new_Level = new Level(req.body);
  new_Level.save(function(err, Level) {
    if (err)
      res.send(err);
    res.json(Level);
  });
};
exports.read_a_Level = function(req, res) {
  Level.findById(req.params.LevelId, function(err, Level) {
    if (err)
      res.send(err);
    res.json(Level);
  });
};
exports.update_a_Level = function(req, res) {
  Level.findOneAndUpdate({_id: req.params.LevelId}, req.body, {new: true}, function(err, Level) {
    if (err)
      res.send(err);
    res.json(Level);
  });
};
exports.delete_a_Level = function(req, res) {
  Level.remove({
    _id: req.params.LevelId
  }, function(err, Level) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

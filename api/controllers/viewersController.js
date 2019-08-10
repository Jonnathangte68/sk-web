'use strict';
var mongoose = require('mongoose'),
  Viewer = mongoose.model('Viewer');
exports.list_all_Viewer = function(req, res) {
  Viewer.find({}, function(err, Viewer) {
    if (err)
      res.send(err);
    res.json(Viewer);
  });
};
exports.create_a_Viewer = function(req, res) {
  var new_Viewer = new Viewer(req.body);
  new_Viewer.save(function(err, Viewer) {
    if (err)
      res.send(err);
    res.json(Viewer);
  });
};
exports.read_a_Viewer = function(req, res) {
  Viewer.findById(req.params.ViewerId, function(err, Viewer) {
    if (err)
      res.send(err);
    res.json(Viewer);
  });
};
exports.update_a_Viewer = function(req, res) {
  Viewer.findOneAndUpdate({_id: req.params.ViewerId}, req.body, {new: true}, function(err, Viewer) {
    if (err)
      res.send(err);
    res.json(Viewer);
  });
};
exports.delete_a_Viewer = function(req, res) {
  Viewer.remove({
    _id: req.params.ViewerId
  }, function(err, Viewer) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

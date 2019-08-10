'use strict';
var mongoose = require('mongoose'),
  State = mongoose.model('State');
exports.list_all_State = function(req, res) {
  State.find({}, function(err, State) {
    if (err)
      res.send(err);
    res.json(State);
  });
};
exports.create_a_State = function(req, res) {
  var new_State = new State(req.body);
  new_State.save(function(err, State) {
    if (err)
      res.send(err);
    res.json(State);
  });
};
exports.read_a_State = function(req, res) {
  State.findById(req.params.StateId, function(err, State) {
    if (err)
      res.send(err);
    res.json(State);
  });
};
exports.update_a_State = function(req, res) {
  State.findOneAndUpdate({_id: req.params.StateId}, req.body, {new: true}, function(err, State) {
    if (err)
      res.send(err);
    res.json(State);
  });
};
exports.delete_a_State = function(req, res) {
  State.remove({
    _id: req.params.StateId
  }, function(err, State) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

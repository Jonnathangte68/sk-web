'use strict';
var mongoose = require('mongoose'),
  RecruiterFavourite = mongoose.model('RecruiterFavourite');
exports.list_all_RecruiterFavourite = function(req, res) {
  RecruiterFavourite.find({}, function(err, RecruiterFavourite) {
    if (err)
      res.send(err);
    res.json(RecruiterFavourite);
  });
};
exports.create_a_RecruiterFavourite = function(req, res) {
  var new_RecruiterFavourite = new RecruiterFavourite(req.body);
  new_RecruiterFavourite.save(function(err, RecruiterFavourite) {
    if (err)
      res.send(err);
    res.json(RecruiterFavourite);
  });
};
exports.read_a_RecruiterFavourite = function(req, res) {
  RecruiterFavourite.findById(req.params.RecruiterFavouriteId, function(err, RecruiterFavourite) {
    if (err)
      res.send(err);
    res.json(RecruiterFavourite);
  });
};
exports.update_a_RecruiterFavourite = function(req, res) {
  RecruiterFavourite.findOneAndUpdate({_id: req.params.RecruiterFavouriteId}, req.body, {new: true}, function(err, RecruiterFavourite) {
    if (err)
      res.send(err);
    res.json(RecruiterFavourite);
  });
};
exports.delete_a_RecruiterFavourite = function(req, res) {
  RecruiterFavourite.remove({
    _id: req.params.RecruiterFavouriteId
  }, function(err, RecruiterFavourite) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

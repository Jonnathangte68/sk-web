'use strict';
var mongoose = require('mongoose'),
  ContentImage = mongoose.model('ContentImage');
exports.list_all_ContentImage = function(req, res) {
  ContentImage.find({}, function(err, ContentImage) {
    if (err)
      res.send(err);
    res.json(ContentImage);
  });
};
exports.create_a_ContentImage = function(req, res) {
  var new_ContentImage = new ContentImage(req.body);
  new_ContentImage.save(function(err, ContentImage) {
    if (err)
      res.send(err);
    res.json(ContentImage);
  });
};
exports.read_a_ContentImage = function(req, res) {
  ContentImage.findById(req.params.ContentImageId, function(err, ContentImage) {
    if (err)
      res.send(err);
    res.json(ContentImage);
  });
};
exports.update_a_ContentImage = function(req, res) {
  ContentImage.findOneAndUpdate({_id: req.params.ContentImageId}, req.body, {new: true}, function(err, ContentImage) {
    if (err)
      res.send(err);
    res.json(ContentImage);
  });
};
exports.delete_a_ContentImage = function(req, res) {
  ContentImage.remove({
    _id: req.params.ContentImageId
  }, function(err, ContentImage) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

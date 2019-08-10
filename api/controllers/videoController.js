'use strict';
var mongoose = require('mongoose'),
  Video = mongoose.model('Video');
exports.list_all_Video = function(req, res) {
  Video.find({}, function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};
exports.create_a_Video = function(req, res) {
  var new_Video = new Video(req.body);
  new_Video.save(function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};
exports.read_a_Video = function(req, res) {
  Video.findById(req.params.VideoId, function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};
exports.update_a_Video = function(req, res) {
  Video.findOneAndUpdate({_id: req.params.VideoId}, req.body, {new: true}, function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};
exports.delete_a_Video = function(req, res) {
  Video.remove({
    _id: req.params.VideoId
  }, function(err, Video) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

'use strict';
var mongoose = require('mongoose'),
  SocialMedia = mongoose.model('SocialMedia');
exports.list_all_SocialMedia = function(req, res) {
  SocialMedia.find({}, function(err, SocialMedia) {
    if (err)
      res.send(err);
    res.json(SocialMedia);
  });
};
exports.create_a_SocialMedia = function(req, res) {
  var new_SocialMedia = new SocialMedia(req.body);
  new_SocialMedia.save(function(err, SocialMedia) {
    if (err)
      res.send(err);
    res.json(SocialMedia);
  });
};
exports.read_a_SocialMedia = function(req, res) {
  SocialMedia.findById(req.params.SocialMediaId, function(err, SocialMedia) {
    if (err)
      res.send(err);
    res.json(SocialMedia);
  });
};
exports.update_a_SocialMedia = function(req, res) {
  SocialMedia.findOneAndUpdate({_id: req.params.SocialMediaId}, req.body, {new: true}, function(err, SocialMedia) {
    if (err)
      res.send(err);
    res.json(SocialMedia);
  });
};
exports.delete_a_SocialMedia = function(req, res) {
  SocialMedia.remove({
    _id: req.params.SocialMediaId
  }, function(err, SocialMedia) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

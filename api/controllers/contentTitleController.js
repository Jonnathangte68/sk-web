'use strict';
var mongoose = require('mongoose'),
  ContentTitle = mongoose.model('ContentTitle');
exports.list_all_ContentTitle = function(req, res) {
  ContentTitle.find({}, function(err, ContentTitle) {
    if (err)
      res.send(err);
    res.json(ContentTitle);
  });
};
exports.create_a_ContentTitle = function(req, res) {
  var new_ContentTitle = new ContentTitle(req.body);
  new_ContentTitle.save(function(err, ContentTitle) {
    if (err)
      res.send(err);
    res.json(ContentTitle);
  });
};
exports.read_a_ContentTitle = function(req, res) {
  ContentTitle.findById(req.params.ContentTitleId, function(err, ContentTitle) {
    if (err)
      res.send(err);
    res.json(ContentTitle);
  });
};
exports.update_a_ContentTitle = function(req, res) {
  ContentTitle.findOneAndUpdate({_id: req.params.ContentTitleId}, req.body, {new: true}, function(err, ContentTitle) {
    if (err)
      res.send(err);
    res.json(ContentTitle);
  });
};
exports.delete_a_ContentTitle = function(req, res) {
  ContentTitle.remove({
    _id: req.params.ContentTitleId
  }, function(err, ContentTitle) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

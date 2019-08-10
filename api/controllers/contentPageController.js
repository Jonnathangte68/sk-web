'use strict';
var mongoose = require('mongoose'),
  ContentPage = mongoose.model('ContentPage');
exports.list_all_ContentPage = function(req, res) {
  ContentPage.find({}, function(err, ContentPage) {
    if (err)
      res.send(err);
    res.json(ContentPage);
  });
};
exports.create_a_ContentPage = function(req, res) {
  var new_ContentPage = new ContentPage(req.body);
  new_ContentPage.save(function(err, ContentPage) {
    if (err)
      res.send(err);
    res.json(ContentPage);
  });
};
exports.read_a_ContentPage = function(req, res) {
  ContentPage.findById(req.params.ContentPageId, function(err, ContentPage) {
    if (err)
      res.send(err);
    res.json(ContentPage);
  });
};
exports.update_a_ContentPage = function(req, res) {
  ContentPage.findOneAndUpdate({_id: req.params.ContentPageId}, req.body, {new: true}, function(err, ContentPage) {
    if (err)
      res.send(err);
    res.json(ContentPage);
  });
};
exports.delete_a_ContentPage = function(req, res) {
  ContentPage.remove({
    _id: req.params.ContentPageId
  }, function(err, ContentPage) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

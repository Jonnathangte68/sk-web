'use strict';
var mongoose = require('mongoose'),
  Folder = mongoose.model('Folder');
exports.list_all_Folder = function(req, res) {
  Folder.find({}, function(err, Folder) {
    if (err)
      res.send(err);
    res.json(Folder);
  });
};
exports.create_a_Folder = function(req, res) {
  var new_Folder = new Folder(req.body);
  new_Folder.save(function(err, Folder) {
    if (err)
      res.send(err);
    res.json(Folder);
  });
};
exports.read_a_Folder = function(req, res) {
  Folder.findById(req.params.FolderId, function(err, Folder) {
    if (err)
      res.send(err);
    res.json(Folder);
  });
};
exports.update_a_Folder = function(req, res) {
  Folder.findOneAndUpdate({_id: req.params.Folder}, req.body, {new: true}, function(err, Folder) {
    if (err)
      res.send(err);
    res.json(Folder);
  });
};
exports.delete_a_Folder = function(req, res) {
  Folder.remove({
    _id: req.params.FolderId
  }, function(err, country) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

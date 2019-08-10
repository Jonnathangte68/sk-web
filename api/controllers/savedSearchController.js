'use strict';
var mongoose = require('mongoose'),
  SavedSearch = mongoose.model('SavedSearch');
exports.list_all_SavedSearch = function(req, res) {
  SavedSearch.find({}, function(err, SavedSearch) {
    if (err)
      res.send(err);
    res.json(SavedSearch);
  });
};
exports.create_a_SavedSearch = function(req, res) {
  var new_SavedSearch = new SavedSearch(req.body);
  new_SavedSearch.save(function(err, SavedSearch) {
    if (err)
      res.send(err);
    res.json(SavedSearch);
  });
};
exports.read_a_SavedSearch = function(req, res) {
  SavedSearch.findById(req.params.SavedSearchId, function(err, SavedSearch) {
    if (err)
      res.send(err);
    res.json(SavedSearch);
  });
};
exports.update_a_SavedSearch = function(req, res) {
  SavedSearch.findOneAndUpdate({_id: req.params.SavedSearchId}, req.body, {new: true}, function(err, SavedSearch) {
    if (err)
      res.send(err);
    res.json(SavedSearch);
  });
};
exports.delete_a_SavedSearch = function(req, res) {
  SavedSearch.remove({
    _id: req.params.SavedSearchId
  }, function(err, SavedSearch) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

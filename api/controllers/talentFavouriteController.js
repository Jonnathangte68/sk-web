'use strict';
var mongoose = require('mongoose'),
  TalentFavourite = mongoose.model('TalentFavourite');
exports.list_all_TalentFavourite = function(req, res) {
  TalentFavourite.find({}, function(err, TalentFavourite) {
    if (err)
      res.send(err);
    res.json(TalentFavourite);
  });
};
exports.create_a_TalentFavourite = function(req, res) {
  var new_TalentFavourite = new TalentFavourite(req.body);
  new_TalentFavourite.save(function(err, TalentFavourite) {
    if (err)
      res.send(err);
    res.json(TalentFavourite);
  });
};
exports.read_a_TalentFavourite = function(req, res) {
  TalentFavourite.findById(req.params.TalentFavouriteId, function(err, TalentFavourite) {
    if (err)
      res.send(err);
    res.json(TalentFavourite);
  });
};
exports.update_a_TalentFavourite = function(req, res) {
  TalentFavourite.findOneAndUpdate({_id: req.params.TalentFavouriteId}, req.body, {new: true}, function(err, TalentFavourite) {
    if (err)
      res.send(err);
    res.json(TalentFavourite);
  });
};
exports.delete_a_TalentFavourite = function(req, res) {
  TalentFavourite.remove({
    _id: req.params.TalentFavouriteId
  }, function(err, TalentFavourite) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

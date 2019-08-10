'use strict';
var mongoose = require('mongoose'),
  Sector = mongoose.model('Sector');
exports.list_all_Sector = function(req, res) {
  Sector.find({}, function(err, Sector) {
    if (err)
      res.send(err);
    res.json(Sector);
  });
};
exports.create_a_Sector = function(req, res) {
  var new_Sector = new Sector(req.body);
  new_Sector.save(function(err, Sector) {
    if (err)
      res.send(err);
    res.json(Sector);
  });
};
exports.read_a_Sector = function(req, res) {
  Sector.findById(req.params.SectorId, function(err, Sector) {
    if (err)
      res.send(err);
    res.json(Sector);
  });
};
exports.update_a_Sector = function(req, res) {
  Sector.findOneAndUpdate({_id: req.params.SectorId}, req.body, {new: true}, function(err, Sector) {
    if (err)
      res.send(err);
    res.json(Sector);
  });
};
exports.delete_a_Sector = function(req, res) {
  Sector.remove({
    _id: req.params.SectorId
  }, function(err, Sector) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

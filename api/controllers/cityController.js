'use strict';
var mongoose = require('mongoose'),
  City = mongoose.model('City');
exports.list_all_City = function(req, res) {
  City.find({}, function(err, City) {
    if (err)
      res.send(err);
    res.json(City);
  });
};
exports.create_a_City = function(req, res) {
  var new_City = new City(req.body);
  new_City.save(function(err, City) {
    if (err)
      res.send(err);
    res.json(City);
  });
};
exports.read_a_City = function(req, res) {
  City.findById(req.params.CityId, function(err, City) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (err)
      res.send(err);
    res.json(City);
  });
};
exports.update_a_City = function(req, res) {
  City.findOneAndUpdate({_id: req.params.CityId}, req.body, {new: true}, function(err, City) {
    if (err)
      res.send(err);
    res.json(City);
  });
};
exports.delete_a_City = function(req, res) {
  City.remove({
    _id: req.params.CityId
  }, function(err, City) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

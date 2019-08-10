'use strict';
var mongoose = require('mongoose'),
  Country = mongoose.model('Country');
exports.list_all_Country = function(req, res) {
  Country.find({}, function(err, Country) {
    if (err)
      res.send(err);
    res.json(Country);
  });
};
exports.create_a_Country = function(req, res) {
  var new_Country = new Country(req.body);
  new_Country.save(function(err, Country) {
    if (err)
      res.send(err);
    res.json(Country);
  });
};
exports.read_a_Country = function(req, res) {
  Country.findById(req.params.CountryId, function(err, Country) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (err)
      res.send(err);
    res.json(Country);
  });
};
exports.update_a_Country = function(req, res) {
  Country.findOneAndUpdate({_id: req.params.CountryId}, req.body, {new: true}, function(err, Country) {
    if (err)
      res.send(err);
    res.json(Country);
  });
};
exports.delete_a_Country = function(req, res) {
  Country.remove({
    _id: req.params.CountryId
  }, function(err, Country) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

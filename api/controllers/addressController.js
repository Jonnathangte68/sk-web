'use strict';
var mongoose = require('mongoose'),
  Address = mongoose.model('Address');
exports.list_all_Address = function(req, res) {
  Address.find({}, function(err, Address) {
    if (err)
      res.send(err);
    res.json(Address);
  });
};
exports.create_a_Address = function(req, res) {
  var new_Address = new Address(req.body);
  new_Address.save(function(err, Address) {
    if (err)
      res.send(err);
    res.json(Address);
  });
};
exports.read_a_Address = function(req, res) {
  console.log(req.params.AddressId);
  Address.findOne({_id:req.params.AddressId}, function(err, Address) {
    console.log("Find something");
    console.log(Address);
    if (err)
      res.json(err);
    res.json(Address);
  });
};
exports.update_a_Address = function(req, res) {
  Address.findOneAndUpdate({_id: req.params.Address}, req.body, {new: true}, function(err, Address) {
    if (err)
      res.send(err);
    res.json(Address);
  });
};
exports.delete_a_Address = function(req, res) {
  Address.remove({
    _id: req.params.AddressId
  }, function(err, Address) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

'use strict';
var mongoose = require('mongoose'),
  HTMLGraphicElement = mongoose.model('HTMLGraphicElement');
exports.list_all_HTMLGraphicElement = function(req, res) {
  HTMLGraphicElement.find({}, function(err, HTMLGraphicElement) {
    if (err)
      res.send(err);
    res.json(HTMLGraphicElement);
  });
};
exports.create_a_HTMLGraphicElement = function(req, res) {
  var new_HTMLGraphicElement = new HTMLGraphicElement(req.body);
  new_HTMLGraphicElement.save(function(err, HTMLGraphicElement) {
    if (err)
      res.send(err);
    res.json(new_HTMLGraphicElement);
  });
};
exports.read_a_HTMLGraphicElement = function(req, res) {
  HTMLGraphicElement.findById(req.params.HTMLGraphicElementId, function(err, HTMLGraphicElement) {
    if (err)
      res.send(err);
    res.json(HTMLGraphicElement);
  });
};
exports.update_a_HTMLGraphicElement = function(req, res) {
  HTMLGraphicElement.findOneAndUpdate({_id: req.params.HTMLGraphicElement}, req.body, {new: true}, function(err, HTMLGraphicElement) {
    if (err)
      res.send(err);
    res.json(HTMLGraphicElement);
  });
};
exports.delete_a_HTMLGraphicElement = function(req, res) {
  HTMLGraphicElement.remove({
    _id: req.params.HTMLGraphicElementId
  }, function(err, country) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

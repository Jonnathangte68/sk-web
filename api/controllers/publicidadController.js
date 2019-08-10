'use strict';
var mongoose = require('mongoose'),
  Publicidad = mongoose.model('Publicidad');
exports.list_all_Publicidad = function(req, res) {
  Publicidad.find({}, function(err, Publicidad) {
    if (err)
      res.send(err);
    res.json(Publicidad);
  });
};
exports.create_a_Publicidad = function(req, res) {
  var new_Publicidad = new Publicidad(req.body);
  new_Publicidad.save(function(err, Publicidad) {
    if (err)
      res.send(err);
    res.json(Publicidad);
  });
};
exports.read_a_Publicidad = function(req, res) {
  Publicidad.findById(req.params.PublicidadId, function(err, Publicidad) {
    if (err)
      res.send(err);
    res.json(Publicidad);
  });
};
exports.update_a_Publicidad = function(req, res) {
  Publicidad.findOneAndUpdate({_id: req.params.PublicidadId}, req.body, {new: true}, function(err, Publicidad) {
    if (err)
      res.send(err);
    res.json(Publicidad);
  });
};
exports.delete_a_Publicidad = function(req, res) {
  Publicidad.remove({
    _id: req.params.PublicidadId
  }, function(err, Publicidad) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

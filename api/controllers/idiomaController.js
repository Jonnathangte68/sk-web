'use strict';
var mongoose = require('mongoose'),
  Idioma = mongoose.model('Idioma');
exports.list_all_Idioma = function(req, res) {
  Idioma.find({}, function(err, Idioma) {
    if (err)
      res.send(err);
    res.json(Idioma);
  });
};
exports.create_a_Idioma = function(req, res) {
  var new_Idioma = new Idioma(req.body);
  new_Idioma.save(function(err, Idioma) {
    if (err)
      res.send(err);
    res.json(Idioma);
  });
};
exports.read_a_Idioma = function(req, res) {
  Idioma.findById(req.params.IdiomaId, function(err, Idioma) {
    if (err)
      res.send(err);
    res.json(Idioma);
  });
};
exports.update_a_Idioma = function(req, res) {
  Idioma.findOneAndUpdate({_id: req.params.IdiomaId}, req.body, {new: true}, function(err, Idioma) {
    if (err)
      res.send(err);
    res.json(Idioma);
  });
};
exports.delete_a_Idioma = function(req, res) {
  Idioma.remove({
    _id: req.params.IdiomaId
  }, function(err, Idioma) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

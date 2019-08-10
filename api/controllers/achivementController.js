'use strict';
var mongoose = require('mongoose'),
  Achivement = mongoose.model('Achivement'),
  Talent = mongoose.model('Talent');
exports.list_all_Achivement = function(req, res) {
  Achivement.find({}, function(err, Achivement) {
    if (err)
      res.send(err);
    res.json(Achivement);
  });
};
exports.create_a_Achivement = function(req, res) {
  var new_Achivement = new Achivement(req.body);
  new_Achivement.save(function(err, Achivement) {
    if (err)
      res.send(err);
    Talent.findOne({'_id':Achivement.talent}, function(error,Talent) {
        Talent.achivements.push(Achivement._id);
        Talent.save();
        res.json(Achivement);
      });
  });
};
exports.read_a_Achivement = function(req, res) {
  Achivement.findById(req.params.AchivementId, function(err, Achivement) {
    if (err)
      res.send(err);
    res.json(Achivement);
  });
};
exports.update_a_Achivement = function(req, res) {
  Achivement.findOneAndUpdate({_id: req.params.Achivement}, req.body, {new: true}, function(err, Achivement) {
    if (err)
      res.send(err);
    res.json(Achivement);
  });
};
exports.delete_a_Achivement = function(req, res) {
  Achivement.remove({
    _id: req.params.AchivementId
  }, function(err, country) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

'use strict';
var mongoose = require('mongoose'),
  Recruiter = mongoose.model('Recruiter'),
  User = mongoose.model('User');
exports.list_all_Recruiter = function(req, res) {
  Recruiter.find({}, function(err, Recruiter) {
    if (err)
      res.send(err);
    res.json(Recruiter);
  });
};
exports.create_a_Recruiter = function(req, res) {
  var new_Recruiter = new Recruiter(req.body);
  new_Recruiter.save(function(err, Recruiter) {
    if (err)
      res.send(err);
    res.json(Recruiter);
  });
};
exports.read_a_Recruiter = function(req, res) {
  console.log('dentro aqui');
  console.log(req.params.RecruiterId);
  Recruiter.findById(req.params.RecruiterId, function(err, Recruiter) {
    // Disable caching for content files
    console.log('entra parte 2');
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (err)
      res.send(err);
    res.json(Recruiter);
  });
};
exports.read_recruiter_by_user = function(req, res) {
  User.findOne({email:req.query.email}, function(err2, usr) {
    Recruiter.findOne({user:usr._id}, function(err, Recruiter) {
        if (err)
          res.send(err);
        res.json(Recruiter);
    });
  });
};
exports.update_a_Recruiter = function(req, res) {
  Recruiter.findOneAndUpdate({_id: req.params.RecruiterId}, req.body, {new: true}, function(err, Recruiter) {
    if (err)
      res.send(err);
    res.json(Recruiter);
  });
};
exports.delete_a_Recruiter = function(req, res) {
  Recruiter.remove({
    _id: req.params.RecruiterId
  }, function(err, Recruiter) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

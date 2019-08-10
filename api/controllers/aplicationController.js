'use strict';
var mongoose = require('mongoose'),
  Aplication = mongoose.model('Aplication'),
  Talent = mongoose.model('Talent'),
  User = mongoose.model('User');
exports.list_all_Aplication = function(req, res) {
  Aplication.find({}, function(err, Aplication) {
    if (err)
      res.send(err);
    res.json(Aplication);
  });
};
exports.create_a_Aplication = function(req, res) {
  var new_Aplication = new Aplication(req.body);
  new_Aplication.save(function(err, Aplication) {
    if (err)
      res.send(err);
    res.json(Aplication);
  });
};
exports.create_a_Aplication2 = function(req, res) {
  console.log(' user  :  '+req.body.talent);
   User.findOne({email:req.body.talent}, function(err3, user) {
    console.log(' user  :  '+req.body.talent);
    console.log(' user  :  '+user._id);
      Talent.findOne({user:user._id}, function(err, talent) {
        console.log('  talent  '+talent._id);
            var new_Aplication = new Aplication({job: req.body.job_id, talent: talent._id});
            new_Aplication.save(function(err, Aplication) {
              if (err)
                res.send(err);
              res.json(Aplication);
            });
      });
  });
  
};
exports.get_status_new_application = function(req, res) {
  User.findOne({email:req.query.talent_id}, function(err3, user) {
      console.log(user);
      Talent.findOne({user:user._id}, function(err, talent) {
          Aplication.count({job:req.query.job_id, talent:talent._id}, function(err2, aplication_count) {
              res.json({'status':1, 'count':aplication_count});
          });
      });
  });
    //res.json({'param1': req.query.job_id, 'param2': req.query.talent_id});
};
exports.read_a_Aplication = function(req, res) {
  Aplication.findById(req.params.AplicationId, function(err, Aplication) {
    if (err)
      res.send(err);
    res.json(Aplication);
  });
};
exports.update_a_Aplication = function(req, res) {
  Aplication.findOneAndUpdate({_id: req.params.AplicationId}, req.body, {new: true}, function(err, Aplication) {
    if (err)
      res.send(err);
    res.json(Aplication);
  });
};
exports.delete_a_Aplication = function(req, res) {
  Aplication.remove({
    _id: req.params.AplicationId
  }, function(err, Aplication) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

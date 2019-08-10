'use strict';
var mongoose = require('mongoose'),
  Notification = mongoose.model('Notification'),
  User = mongoose.model('User');
exports.list_all_Notification = function(req, res) {
  Notification.find({}, function(err, Notification) {
    if (err)
      res.send(err);
    res.json(Notification);
  });
};
exports.create_a_Notification = function(req, res) {
  var new_Notification = new Notification(req.body);
  new_Notification.save(function(err, Notification) {
    if (err)
      res.send(err);
    Talent.findOne({'_id':Notification.talent}, function(error,Talent) {
        Talent.achivements.push(Notification._id);
        Talent.save();
        res.json(Notification);
      });
  });
};
exports.read_a_Notification = function(req, res) {
  /*Notification.findById(req.params.NotificationId, function(err, Notification) {
    if (err)
      res.send(err);
    res.json(Notification);
  });*/
  User.findOne({email:req.params.NotificationId}, function(err, UserId) {
    if (err)
      res.send(err);
    if (UserId) {
        var compareDate = new Date();
        compareDate.setDate(compareDate.getDate()-15);
        Notification.find({ $and: [ {user:UserId._id}, {status:1}, {Created_date: { $gt: compareDate }} ]}, function (err2, docs) {
            if (err2) {
              res.send(err2)
            }
            res.json(docs)
        });
    }
  });
};
exports.update_a_Notification = function(req, res) {
  Notification.findOneAndUpdate({_id: req.params.Notification}, req.body, {new: true}, function(err, Notification) {
    if (err)
      res.send(err);
    res.json(Notification);
  });
};
exports.delete_a_Notification = function(req, res) {
  Notification.remove({
    _id: req.params.NotificationId
  }, function(err, country) {
    if (err)
      res.send(err);
    res.json({ message: 'Notification successfully deleted' });
  });
};

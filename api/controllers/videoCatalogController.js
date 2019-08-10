'use strict';
var mongoose = require('mongoose'),
  VideoCatalog = mongoose.model('VideoCatalog'),
  User = mongoose.model('User');
exports.list_all_VideoCatalog = function(req, res) {
  VideoCatalog.find({}, function(err, VideoCatalog) {
    if (err)
      res.send(err);
    res.json(VideoCatalog);
  });
};
exports.create_a_VideoCatalog = function(req, res) {
  var new_VideoCatalog = new VideoCatalog(req.body);
  new_VideoCatalog.save(function(err, VideoCatalog) {
    if (err)
      res.send(err);
    res.json(VideoCatalog);
  });
};
exports.get_catalog_by_user = function(req, res) {
    User.findOne({email:req.query.email}, function(err1, u) {
      VideoCatalog.findOne({user:u._id}, function(err, v) {
        if (err)
          res.send(err);
        res.json(v);
      });
    });
};
exports.read_a_VideoCatalog = function(req, res) {
  VideoCatalog.findById(req.params.VideoCatalogId, function(err, VideoCatalog) {
    if (err)
      res.send(err);
    res.json(VideoCatalog);
  });
};
exports.check_videos_for_user = function(req, res) {
  User.findOne({email:req.query.email}, function (err1, u) {
      Talent.findOne({user:u._id}, function (err2, t) {
          VideoCatalog.count({talent:t._id}, function (err7, catalog) {
              res.json({'status':1, 'message':catalog});
              res.end();
          });
      });
  });
};
exports.update_a_VideoCatalog = function(req, res) {
  VideoCatalog.findOneAndUpdate({_id: req.params.VideoCatalogId}, req.body, {new: true}, function(err, VideoCatalog) {
    if (err)
      res.send(err);
    res.json(VideoCatalog);
  });
};
exports.delete_a_VideoCatalog = function(req, res) {
  VideoCatalog.remove({
    _id: req.params.VideoCatalogId
  }, function(err, VideoCatalog) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

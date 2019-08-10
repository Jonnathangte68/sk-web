'use strict';
var mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
  User = mongoose.model('User'),
  Talent = mongoose.model('Talent'),
  Recruiter = mongoose.model('Recruiter');
exports.list_all_Category = function(req, res) {
  Category.find({}, function(err, Category) {
    if (err)
      res.send(err);
    res.json(Category);
  });
};
exports.list_all_categories_by_user = function(req, res) {
    User.findOne({email:req.query.email},function(err7, u){
        Talent.findOne({user:u._id},function(err5,t){
        if(t){
            res.json({'status':1,'message':t.category});
            res.end();
        }
        });
        Recruiter.findOne({user:u._id},function(err6,r){
        if(r){
            res.json({'status':1,'message':r.interest_list});
            res.end();
        }
        });
    });
};
exports.create_a_Category = function(req, res) {
  var new_Category = new Category(req.body);
  new_Category.save(function(err, Category) {
    if (err)
      res.send(err);
    res.json(Category);
  });
};
exports.read_a_Category = function(req, res) {
  Category.findById(req.params.CategoryId, function(err, Category) {
    if (err)
      res.send(err);
    res.json(Category);
  });
};
exports.update_a_Category = function(req, res) {
  Category.findOneAndUpdate({_id: req.params.CategoryId}, req.body, {new: true}, function(err, Category) {
    if (err)
      res.send(err);
    res.json(Category);
  });
};
exports.delete_a_Category = function(req, res) {
  Category.remove({
    _id: req.params.CategoryId
  }, function(err, Category) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

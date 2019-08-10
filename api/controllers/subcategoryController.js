'use strict';
var mongoose = require('mongoose'),
  Subcategory = mongoose.model('Subcategory'),
  User = mongoose.model('User'),
  Talent = mongoose.model('Talent'),
  Recruiter = mongoose.model('Recruiter');
exports.list_all_Subcategory = function(req, res) {
  Subcategory.find({}, function(err, Subcategory) {
    if (err)
      res.send(err);
    res.json(Subcategory);
  });
};
exports.list_all_subcategory_for_user = function(req, res) {
      User.findOne({email:req.query.email},function(err7, u){
        Talent.findOne({user:u._id},function(err5,t){
         // console.log(t);
          if(t){
            res.json({'status':1,'message':t.subcategory});
            res.end();
          }
        });
        Recruiter.findOne({user:u._id},function(err6,r){
         // console.log(r);
          if(r){
            res.json({'status':1,'message':r.interest_list});
            res.end();
          }
        });
    });    
};
exports.create_a_Subcategory = function(req, res) {
  var new_Subcategory = new Subcategory(req.body);
  new_Subcategory.save(function(err, Subcategory) {
    if (err)
      res.send(err);
    res.json(Subcategory);
  });
};
exports.read_a_Subcategory = function(req, res) {
  Subcategory.findById(req.params.SubcategoryId, function(err, Subcategory) {
    if (err)
      res.send(err);
    res.json(Subcategory);
  });
};
exports.update_a_Subcategory = function(req, res) {
  Subcategory.findOneAndUpdate({_id: req.params.SubcategoryId}, req.body, {new: true}, function(err, Subcategory) {
    if (err)
      res.send(err);
    res.json(Subcategory);
  });
};
exports.delete_a_Subcategory = function(req, res) {
  Subcategory.remove({
    _id: req.params.SubcategoryId
  }, function(err, Subcategory) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

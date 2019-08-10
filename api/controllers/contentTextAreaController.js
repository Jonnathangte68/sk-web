'use strict';
var mongoose = require('mongoose'),
  ContentTextArea = mongoose.model('ContentTextArea');
exports.list_all_ContentTextArea = function(req, res) {
  ContentTextArea.find({}, function(err, ContentTextArea) {
    if (err)
      res.send(err);
    res.json(ContentTextArea);
  });
};
exports.create_a_ContentTextArea = function(req, res) {
  console.log(req.body);
  console.log(req.body.name);
   ContentTextArea.find({'name':req.body.name}, function(err, ContentTextAreaFinded) {
    console.log(ContentTextAreaFinded);

    
    
if (ContentTextAreaFinded.length > 0) {
  ContentTextArea.remove({
    'name': req.body.name
  }, function(err, ContentTextArea) {});
}
    var new_ContentTextArea = new ContentTextArea(req.body);
      new_ContentTextArea.save(function(err, ContentTextArea) {
        if (err)
          res.send(err);
        res.json(ContentTextArea);
      });



  });
  
};
exports.read_a_ContentTextArea = function(req, res) {
  console.log(req.params);
  ContentTextArea.find({'name':req.params.ContentTextAreaId}, function(err, ContentTextArea) {
    if (err)
      res.send(err);
    res.json(ContentTextArea);
  });
};
exports.update_a_ContentTextArea = function(req, res) {
  ContentTextArea.findOneAndUpdate({'name': req.params.ContentTextAreaId}, req.body, {new: true}, function(err, ContentTextArea) {
    if (err)
      res.send(err);
    res.json(ContentTextArea);
  });
};
exports.delete_a_ContentTextArea = function(req, res) {
  ContentTextArea.remove({
    'name': req.params.ContentTextAreaId
  }, function(err, ContentTextArea) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

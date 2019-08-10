'use strict';
var mongoose = require('mongoose'),
  Page = mongoose.model('Page');
exports.list_all_Pages = function(req, res) {
  Page.find({}, function(err, Page) {
    if (err)
      res.send(err);
    res.json(Page);
  });
};
exports.create_a_Page = function(req, res) {
  Page.findOne({'name':req.body.name}, function(err, pag) {
	if (err)
	      res.send(0);
	if(pag) {
		// Update 
		pag.html = req.body.html;
		pag.css = req.body.css;
		pag.name = req.body.name;
		pag.save();
		console.log("Updated page");
	    console.log(pag);
		res.send("true");
	}else {
		// Create
		var new_Page = new Page(req.body);
	    new_Page.save(function(err2, pag) {
	      if (err2)
	        res.send(0);
	      console.log("Created page");
	      console.log(pag);
	      res.send("true");
	    });
	}
  });
};
exports.read_a_Page = function(req, res) {
  Page.findOne({name: req.params.PageId}, function(err, Page) {
    if (err)
      res.send(err);
    res.json(Page);
  });
};
/*exports.get_page_by_name = function(req, res) {
	Page.find({'name': req.params.PageId}, function(err, Page) {
		if (err) {
			res.send(err);
		}
		res.json(Page);
	});
};*/
exports.update_a_Page = function(req, res) {
  Page.findOneAndUpdate({_id: req.params.PageId}, req.body, {new: true}, function(err, Page) {
    if (err)
      res.send(err);
    res.json(Page);
  });
};
exports.delete_a_Page = function(req, res) {
  Page.remove({
    _id: req.params.PageId
  }, function(err, country) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

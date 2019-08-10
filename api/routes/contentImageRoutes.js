'use strict';
module.exports = function(app) {
  var contentImageCtrl = require('../controllers/contentImageController');

  // todoList Routes
  app.route('/contentimages')
    .get(contentImageCtrl.list_all_ContentImage)
    .post(contentImageCtrl.create_a_ContentImage);


  app.route('/contentimages/:ContentImageId')
    .get(contentImageCtrl.read_a_ContentImage)
    .put(contentImageCtrl.update_a_ContentImage)
    .delete(contentImageCtrl.delete_a_ContentImage);
};

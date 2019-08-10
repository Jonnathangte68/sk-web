'use strict';
module.exports = function(app) {
  var	videoCatalogCtrl = require('../controllers/videoCatalogController');

  // todoList Routes
  app.route('/videocatalogs')
   	.get(videoCatalogCtrl.list_all_VideoCatalog)
   	.post(videoCatalogCtrl.create_a_VideoCatalog);

  app.route('/user_has_video')
   	.get(videoCatalogCtrl.check_videos_for_user);

  app.route('/get_catalog_by_user')
   	.get(videoCatalogCtrl.get_catalog_by_user);

  app.route('/videocatalogs/:VideoCatalogId')
   	.get(videoCatalogCtrl.read_a_VideoCatalog)
   	.put(videoCatalogCtrl.update_a_VideoCatalog)
   	.delete(videoCatalogCtrl.delete_a_VideoCatalog);
};

'use strict';
module.exports = function(app) {
  var viewerCtrl = require('../controllers/viewersController');

  // todoList Routes
  app.route('/viewer')
    .get(viewerCtrl.list_all_Viewer)
    .post(viewerCtrl.create_a_Viewer);


  app.route('/viewer/:ViewerId')
    .get(viewerCtrl.read_a_Viewer)
    .put(viewerCtrl.update_a_Viewer)
    .delete(viewerCtrl.delete_a_Viewer);
};

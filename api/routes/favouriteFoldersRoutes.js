'use strict';
module.exports = function(app) {
  var favouriteFolderCtrl = require('../controllers/favouriteFoldersController');

  // todoList Routes
  app.route('/favouritefolders')
    .get(favouriteFolderCtrl.list_all_favouriteFolder)
    .post(favouriteFolderCtrl.create_a_favouriteFolder);


  app.route('/favouritefolders/:favouriteFolderId')
    .get(favouriteFolderCtrl.read_a_favouriteFolder)
    .put(favouriteFolderCtrl.update_a_favouriteFolder)
    .delete(favouriteFolderCtrl.delete_a_favouriteFolder);
};

'use strict';
module.exports = function(app) {
  var folderCtrl = require('../controllers/folderController');

  // todoList Routes
  app.route('/folders')
    .get(folderCtrl.list_all_Folder)
    .post(folderCtrl.create_a_Folder);


  app.route('/folders/:FolderId')
    .get(folderCtrl.read_a_Folder)
    .put(folderCtrl.update_a_Folder)
    .delete(folderCtrl.delete_a_Folder);
};

'use strict';
module.exports = function(app) {
  var savedSearchCtrl = require('../controllers/savedSearchController');

  // todoList Routes
  app.route('/savedsearchs')
    .get(savedSearchCtrl.list_all_SavedSearch)
    .post(savedSearchCtrl.create_a_SavedSearch);


  app.route('/savedsearchs/:SavedSearchId')
    .get(savedSearchCtrl.read_a_SavedSearch)
    .put(savedSearchCtrl.update_a_SavedSearch)
    .delete(savedSearchCtrl.delete_a_SavedSearch);
};

'use strict';
module.exports = function(app) {
  var contentPageController = require('../controllers/contentPageController');

  // todoList Routes
  app.route('/contentpages')
    .get(contentPageController.list_all_ContentPage)
    .post(contentPageController.create_a_ContentPage);


  app.route('/contentpages/:ContentPageId')
    .get(contentPageController.read_a_ContentPage)
    .put(contentPageController.update_a_ContentPage)
    .delete(contentPageController.delete_a_ContentPage);
};

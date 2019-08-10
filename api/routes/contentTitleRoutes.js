'use strict';
module.exports = function(app) {
  var contentTitleController = require('../controllers/contentTitleController');

  // todoList Routes
  app.route('/contenttitles')
    .get(contentTitleController.list_all_ContentTitle)
    .post(contentTitleController.create_a_ContentTitle);


  app.route('/contenttitles/:ContentTitleId')
    .get(contentTitleController.read_a_ContentTitle)
    .put(contentTitleController.update_a_ContentTitle)
    .delete(contentTitleController.delete_a_ContentTitle);
};

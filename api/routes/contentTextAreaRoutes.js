'use strict';
module.exports = function(app) {
  var contentTextAreaController = require('../controllers/contentTextAreaController');

  // todoList Routes
  app.route('/contenttextareas')
    .get(contentTextAreaController.list_all_ContentTextArea)
    .post(contentTextAreaController.create_a_ContentTextArea);


  app.route('/contenttextareas/:ContentTextAreaId')
    .get(contentTextAreaController.read_a_ContentTextArea)
    //.get(contentTextAreaController.read_a_ContentTextAreaName)
    .put(contentTextAreaController.update_a_ContentTextArea)
    .delete(contentTextAreaController.delete_a_ContentTextArea);
};

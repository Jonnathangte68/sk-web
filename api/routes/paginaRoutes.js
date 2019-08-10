'use strict';
module.exports = function(app) {
  var pageCtrl = require('../controllers/pageController');

  // todoList Routes
  app.route('/pages')
    .get(pageCtrl.list_all_Pages)
    .post(pageCtrl.create_a_Page);

  /*app.route('/pagesByName')
    .get(pageCtrl.get_page_by_name);*/


  app.route('/pages/:PageId')
    .get(pageCtrl.read_a_Page)
    .put(pageCtrl.update_a_Page)
    .delete(pageCtrl.delete_a_Page);
};

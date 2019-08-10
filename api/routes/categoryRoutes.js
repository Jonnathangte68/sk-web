'use strict';
module.exports = function(app) {
  var categoryCtrl = require('../controllers/categoryController');

  // todoList Routes
  app.route('/categorys')
    .get(categoryCtrl.list_all_Category)
    .post(categoryCtrl.create_a_Category);

  app.route('/get_user_categories')
  	.get(categoryCtrl.list_all_categories_by_user);


  app.route('/categorys/:CategoryId')
    .get(categoryCtrl.read_a_Category)
    .put(categoryCtrl.update_a_Category)
    .delete(categoryCtrl.delete_a_Category);
};

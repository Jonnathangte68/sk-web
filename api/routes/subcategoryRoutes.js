'use strict';
module.exports = function(app) {
  var	subcategoryCtrl = require('../controllers/subcategoryController');

  // todoList Routes
  app.route('/subcategorys')
   	.get(subcategoryCtrl.list_all_Subcategory)
   	.post(subcategoryCtrl.create_a_Subcategory);


	app.route('/user_subcategories')
	   	.get(subcategoryCtrl.list_all_subcategory_for_user);


  app.route('/subcategorys/:SubcategoryId')
   	.get(subcategoryCtrl.read_a_Subcategory)
   	.put(subcategoryCtrl.update_a_Subcategory)
   	.delete(subcategoryCtrl.delete_a_Subcategory);
};

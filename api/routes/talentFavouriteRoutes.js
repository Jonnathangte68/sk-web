'use strict';
module.exports = function(app) {
  var	talentFavouriteCtrl = require('../controllers/talentFavouriteController');

  // todoList Routes
  app.route('/talentfavourites')
   	.get(talentFavouriteCtrl.list_all_TalentFavourite)
   	.post(talentFavouriteCtrl.create_a_TalentFavourite);


  app.route('/talentfavourites/:TalentFavouriteId')
   	.get(talentFavouriteCtrl.read_a_TalentFavourite)
   	.put(talentFavouriteCtrl.update_a_TalentFavourite)
   	.delete(talentFavouriteCtrl.delete_a_TalentFavourite);
};

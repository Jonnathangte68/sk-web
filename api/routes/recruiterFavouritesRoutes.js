'use strict';
module.exports = function(app) {
  var recruiterFavouritesCtrl = require('../controllers/recruiterFavouritesController');

  // todoList Routes
  app.route('/recruiterfavourites')
    .get(recruiterFavouritesCtrl.list_all_RecruiterFavourite)
    .post(recruiterFavouritesCtrl.create_a_RecruiterFavourite);


  app.route('/recruiterfavourites/:RecruiterFavouritesId')
    .get(recruiterFavouritesCtrl.read_a_RecruiterFavourite)
    .put(recruiterFavouritesCtrl.update_a_RecruiterFavourite)
    .delete(recruiterFavouritesCtrl.delete_a_RecruiterFavourite);
};

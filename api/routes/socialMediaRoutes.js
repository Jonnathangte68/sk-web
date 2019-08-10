'use strict';
module.exports = function(app) {
  var socialMediaCtrl = require('../controllers/socialMediaController');

  // todoList Routes
  app.route('/socialmedias')
    .get(socialMediaCtrl.list_all_SocialMedia)
    .post(socialMediaCtrl.create_a_SocialMedia);


  app.route('/socialmedias/:SocialMediaId')
    .get(socialMediaCtrl.read_a_SocialMedia)
    .put(socialMediaCtrl.update_a_SocialMedia)
    .delete(socialMediaCtrl.delete_a_SocialMedia);
};

'use strict';
module.exports = function(app) {
  var followerCtrl = require('../controllers/followerController');

  // todoList Routes
  app.route('/follower')
    .get(followerCtrl.list_all_Follower)
    .post(followerCtrl.create_a_Follower);


  app.route('/follower/:FollowerId')
    .get(followerCtrl.read_a_Follower)
    .put(followerCtrl.update_a_Follower)
    .delete(followerCtrl.delete_a_Follower);
};

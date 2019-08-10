'use strict';
module.exports = function(app) {
  var notificationCtrl = require('../controllers/notificationController');

  // todoList Routes
  app.route('/notifications')
    .get(notificationCtrl.list_all_Notification)
    .post(notificationCtrl.create_a_Notification);


  app.route('/notifications/:NotificationId')
    .get(notificationCtrl.read_a_Notification)
    .put(notificationCtrl.update_a_Notification)
    .delete(notificationCtrl.delete_a_Notification);
};

'use strict';
module.exports = function(app) {
  var positionCtrl = require('../controllers/positionController');

  // todoList Routes
  app.route('/positions')
    .get(positionCtrl.list_all_Position)
    .post(positionCtrl.create_a_Position);


  app.route('/positions/:PositionId')
    .get(positionCtrl.read_a_Position)
    .put(positionCtrl.update_a_Position)
    .delete(positionCtrl.delete_a_Position);
};

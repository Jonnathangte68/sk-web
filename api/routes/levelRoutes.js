'use strict';
module.exports = function(app) {
  var levelCtrl = require('../controllers/levelController');

  // todoList Routes
  app.route('/levels')
    .get(levelCtrl.list_all_Level)
    .post(levelCtrl.create_a_Level);


  app.route('/levels/:LevelId')
    .get(levelCtrl.read_a_Level)
    .put(levelCtrl.update_a_Level)
    .delete(levelCtrl.delete_a_Level);
};

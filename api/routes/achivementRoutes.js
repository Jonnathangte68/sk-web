'use strict';
module.exports = function(app) {
  var achivementCtrl = require('../controllers/achivementController');

  // todoList Routes
  app.route('/achivements')
    .get(achivementCtrl.list_all_Achivement)
    .post(achivementCtrl.create_a_Achivement);


  app.route('/achivements/:AchivementId')
    .get(achivementCtrl.read_a_Achivement)
    .put(achivementCtrl.update_a_Achivement)
    .delete(achivementCtrl.delete_a_Achivement);
};

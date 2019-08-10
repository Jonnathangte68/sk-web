'use strict';
module.exports = function(app) {
  var awardCtrl = require('../controllers/awardController');

  // todoList Routes
  app.route('/awards')
    .get(awardCtrl.list_all_Award)
    .post(awardCtrl.create_a_Award);


  app.route('/awards/:AwardId')
    .get(awardCtrl.read_a_Award)
    .put(awardCtrl.update_a_Award)
    .delete(awardCtrl.delete_a_Award);
};

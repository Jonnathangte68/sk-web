'use strict';
module.exports = function(app) {
  var interestCtrl = require('../controllers/interestController');

  // todoList Routes
  app.route('/interests')
    .get(interestCtrl.list_all_Interest)
    .post(interestCtrl.create_a_Interest);


  app.route('/interests/:InterestId')
    .get(interestCtrl.read_a_Interest)
    .put(interestCtrl.update_a_Interest)
    .delete(interestCtrl.delete_a_Interest);
};

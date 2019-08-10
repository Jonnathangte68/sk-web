'use strict';
module.exports = function(app) {
  var hiddenCtrl = require('../controllers/hiddenController');

  app.route('/hiddenroutes')
    .get(hiddenCtrl.list_all_Hidden)
    .post(hiddenCtrl.create_a_Hidden);


  app.route('/hiddenroutes/:HiddenId')
    .get(hiddenCtrl.read_a_Hidden)
    .put(hiddenCtrl.update_a_Hidden)
    .delete(hiddenCtrl.delete_a_Hidden);
};

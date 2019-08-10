'use strict';
module.exports = function(app) {
  var addressCtrl = require('../controllers/addressController');

  // todoList Routes
  app.route('/address')
    .get(addressCtrl.list_all_Address)
    .post(addressCtrl.create_a_Address);


  app.route('/address/:AddressId')
    .get(addressCtrl.read_a_Address)
    .put(addressCtrl.update_a_Address)
    .delete(addressCtrl.delete_a_Address);
};

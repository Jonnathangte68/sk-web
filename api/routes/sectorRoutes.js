'use strict';
module.exports = function(app) {
  var sectorCtrl = require('../controllers/sectorController');

  // todoList Routes
  app.route('/sectors')
    .get(sectorCtrl.list_all_Sector)
    .post(sectorCtrl.create_a_Sector);


  app.route('/sectors/:SectorId')
    .get(sectorCtrl.read_a_Sector)
    .put(sectorCtrl.update_a_Sector)
    .delete(sectorCtrl.delete_a_Sector);
};

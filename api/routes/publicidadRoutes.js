'use strict';
module.exports = function(app) {
  var publicidadCtrl = require('../controllers/publicidadController');

  // todoList Routes
  app.route('/publicidads')
    .get(publicidadCtrl.list_all_Publicidad)
    .post(publicidadCtrl.create_a_Publicidad);


  app.route('/publicidads/:PublicidadId')
    .get(publicidadCtrl.read_a_Publicidad)
    .put(publicidadCtrl.update_a_Publicidad)
    .delete(publicidadCtrl.delete_a_Publicidad);
};

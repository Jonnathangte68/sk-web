'use strict';
module.exports = function(app) {
  var idiomaCtrl = require('../controllers/idiomaController');

  // todoList Routes
  app.route('/idiomas')
    .get(idiomaCtrl.list_all_Idioma)
    .post(idiomaCtrl.create_a_Idioma);


  app.route('/idiomas/:IdiomaId')
    .get(idiomaCtrl.read_a_Idioma)
    .put(idiomaCtrl.update_a_Idioma)
    .delete(idiomaCtrl.delete_a_Idioma);
};

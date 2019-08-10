'use strict';
module.exports = function(app) {
  var HTMLGraphicElementCtrl = require('../controllers/HTMLGraphicElementController');

  // todoList Routes
  app.route('/HTMLGraphicElements')
    .get(HTMLGraphicElementCtrl.list_all_HTMLGraphicElement)
    .post(HTMLGraphicElementCtrl.create_a_HTMLGraphicElement);


  app.route('/HTMLGraphicElements/:HTMLGraphicElementId')
    .get(HTMLGraphicElementCtrl.read_a_HTMLGraphicElement)
    .put(HTMLGraphicElementCtrl.update_a_HTMLGraphicElement)
    .delete(HTMLGraphicElementCtrl.delete_a_HTMLGraphicElement);
};

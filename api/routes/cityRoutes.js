'use strict';
module.exports = function(app) {
  var cityCtrl = require('../controllers/cityController');

  // todoList Routes
  app.route('/citys')
    .get(cityCtrl.list_all_City)
    .post(cityCtrl.create_a_City);


  app.route('/citys/:CityId')
    .get(cityCtrl.read_a_City)
    .put(cityCtrl.update_a_City)
    .delete(cityCtrl.delete_a_City);
};

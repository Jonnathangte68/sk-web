'use strict';
module.exports = function(app) {
  var countryController = require('../controllers/countryController');

  // todoList Routes
  app.route('/countrys')
    .get(countryController.list_all_Country)
    .post(countryController.create_a_Country);


  app.route('/countrys/:CountryId')
    .get(countryController.read_a_Country)
    .put(countryController.update_a_Country)
    .delete(countryController.delete_a_Country);
};

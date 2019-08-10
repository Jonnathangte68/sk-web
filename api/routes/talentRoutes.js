'use strict';
module.exports = function(app) {
  var	talentCtrl = require('../controllers/talentController');

  // todoList Routes
  app.route('/talents')
   	.get(talentCtrl.list_all_Talent)
   	.post(talentCtrl.create_a_Talent);


  app.route('/talents/:TalentId')
   	.get(talentCtrl.read_a_Talent)
   	.put(talentCtrl.update_a_Talent)
   	.delete(talentCtrl.delete_a_Talent);
};

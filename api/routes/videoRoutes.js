'use strict';
module.exports = function(app) {
  var	videoCtrl = require('../controllers/videoController');

  // todoList Routes
  app.route('/videos')
   	.get(videoCtrl.list_all_Video)
   	.post(videoCtrl.create_a_Video);


  app.route('/videos/:VideoId')
   	.get(videoCtrl.read_a_Video)
   	.put(videoCtrl.update_a_Video)
   	.delete(videoCtrl.delete_a_Video);
};

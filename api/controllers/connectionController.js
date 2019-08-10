'use strict';
var mongoose = require('mongoose'),
  Connection = mongoose.model('Connection'),
  Talent = mongoose.model('Talent'),
  Recruiter = mongoose.model('Recruiter'),
  User = mongoose.model('User');
exports.list_all_Connection = function(req, res) {
  Connection.find({}, function(err, Connection) {
    if (err)
      res.send(err);
    res.json(Connection);
  });
};
exports.create_a_Connection = function(req, res) {
  var new_Connection = new Connection(req.body);
  new_Connection.save(function(err, Connection) {
    if (err)
      res.send(err);
    res.json(Connection);
  });
};
exports.read_a_Connection = function(req, res) {
  Connection.findById(req.params.ConnectionId, function(err, Connection) {
    if (err)
      res.send(err);
    res.json(Connection);
  });
};
exports.update_a_Connection = function(req, res) {
  Connection.findOneAndUpdate({_id: req.params.ConnectionId}, req.body, {new: true}, function(err, Connection) {
    if (err)
      res.send(err);
    res.json(Connection);
  });
};
exports.delete_a_Connection = function(req, res) {
  Connection.remove({
    _id: req.params.ConnectionId
  }, function(err, Connection) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
exports.list_all_user_conects = function(req, res) {
  console.log(req.body.u); 
  var user = req.body.u;
  User.find({email:req.query.u}, function(err, usr){
    Connection.find({user_talent:usr._id}, function(err2, con){
      res.json(con);
    });
  });
};
/*exports.list_all_user_suggestions = function(req, res) {
  //console.log(req.body.u); 
  var user = req.body.u;
  var sglist = [];
  var ut = req.body.utype;
  User.findOne({email:req.body.u}, function(err, usera){
      if (ut=='t') {
        
          Talent.findOne({user:usera._id},function (err,tal) {
            
              if (tal) {

                  

                  var category = tal.category;
                  var subcat = tal.subcategory;
                  //console.log(category);

                  User.find({}, function(err, usr){

                      usr.forEach(function (v) {


                          Talent.findOne({user:v._id},function (err,talent) {      
                              if (talent) {
                                var respuesta = talent.category.some(function (vl) {
                                    return category.indexOf(vl) >= 0;
                                });
                                sglist.push(talent);
                              }
                          });

                      });
                      //Talent.findOne({user:usr._id},function (err,talent) {
                        
                          //if (talent) {
                          //  sglist.push(talent);
                          //}
                     // });
                     // Recruiter.findOne({user:usr._id},function (err,recruiter) {
                        
                        //  if (recruiter) {
                        //    sglist.push(recruiter);
                        //  }
                   //   });
                 });

                  return res.json({'status':1, 'message':sglist});

                  

              } //    Talent exist
          });
      }else if(ut=='r'){
          Recruiter.findOne({user:usera._id},function (err,rec) {
            
              if (rec) {


                  var category = rec.category;
                  var subcat = rec.subcategory;
                  //var countru = rec.;
                  //var state = rec.;
                  //var city = rec.;








              }
          });
          console.log(sglist);
      }
      //User.find({}, function(err, usr){
        //  Talent.findOne({user:usr._id},function (err,talent) {
            
          //    if (talent) {
          //      sglist.push(talent);
          //    }
         // });
         // Recruiter.findOne({user:usr._id},function (err,recruiter) {
            
           //   if (recruiter) {
           //     sglist.push(recruiter);
            //  }
        //  });
      //});
  });
};*/

exports.list_all_user_suggestions = function(req, res) {

          var user = req.body.u;
          var sglist = [];
          var ut = req.body.utype;
          User.findOne({email:req.body.u}, function(err, usera){

            var ff = Math.round(Math.random());
            console.log(ff);
            //return res.json({'status':1, 'message':ff});

                      if (ff==1) {

                           //Devolver un talento

                           // Condicionar { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}

                           Talent.count({}, function(err, c) {
                            var loop_until = Math.round(Math.random()*(c-1));
                            var k = 0; // Stop Condition

                                Talent.find({},function (err,tal) {

                                  tal.forEach(function(talent){
                                        if (k==loop_until) {
                                            if (talent) {
                                                res.json({'status':'t', 'message':talent});
                                                res.end();

                                            }else {
                                                res.json({'status':0, 'message':'return_error'});
                                                res.end();
                                            }
                                        }
                                        k++;
                                    });
                                });

                            });

                        }else {


                           Recruiter.count({}, function(err, c) {
                            var loop_until = Math.round(Math.random()*(c-1));
                            var k = 0; // Stop Condition

                                Recruiter.find({},function (err,rec) {


                                  rec.forEach(function(recruiter){

                                    if (k==loop_until) {
                                        if (recruiter) {
                                            res.json({'status':'r', 'message':recruiter});
                                            res.end();

                                        }else {
                                            res.json({'status':1, 'message':'return_error'});
                                            res.end();
                                        }
                                    }
                                    k++;

                                    });
                                });
                            });
                      }

    });       // Fin of user search


};

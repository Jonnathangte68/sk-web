var express = require('express'),
  app = express(),
  bcrypt = require('bcryptjs'),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  lodash = require('lodash'),
  Country = require('./api/models/countryModel'), //created model loading here
  City = require('./api/models/cityModel'),
  State = require('./api/models/statesModel'),
  Category = require('./api/models/categoryModel'),
  Subcategory = require('./api/models/subcategoryModel'),
  ContentTextArea = require('./api/models/contentTextArea'),
  ContentTitle = require('./api/models/contentTitle'),
  ContentImage = require('./api/models/contentImage'),
  ContentPage = require('./api/models/contentPage'),
  Department = require('./api/models/departmentModel'),
  EducationType = require('./api/models/educationTypeModel'),
  Enterprise = require('./api/models/enterpriseModel'),
  Idioma = require('./api/models/idiomaModel'),
  Institution = require('./api/models/institutionModel'),
  Interest = require('./api/models/interestModel'),
  Level = require('./api/models/levelModel'),
  Position = require('./api/models/positionModel'),
  Sector = require('./api/models/sectorModel'),
  SavedSearch = require('./api/models/savedSearchesModel'),
  SocialMedia = require('./api/models/socialMediaModel'),
  Talent = require('./api/models/talentModel'),
  Recruiter = require('./api/models/recruiterModel'),
  RecruiterType = require('./api/models/recruiterTypeModel'),
  Achivement = require('./api/models/achivementsModel'),
  Award = require('./api/models/awardsModel'),
  Education = require('./api/models/educationModel'),
  LaborumExpertice = require('./api/models/laborumExperticeModel'),
  RecruiterFavourite = require('./api/models/recruiterFavouritesModel'),
  VideoCatalog = require('./api/models/videoCatalogModel'),
  Video = require('./api/models/videoModel'),
  TalentFavourites = require('./api/models/talentFavouriteModel'),
  Job = require('./api/models/jobModel'),
  Aplication = require('./api/models/aplicationModel'),
  JobType = require('./api/models/jobTypeModel'),
  Publicidad = require('./api/models/publicidadModel'),
  Address = require('./api/models/addressModel'),
  Connection = require('./api/models/connectionModel'),
  PublicImage = require('./api/models/publicImageModel'),
  Auth = require('./api/models/authModel'),
  Chatthread = require('./api/models/Chatthread'),
  Chatmessage = require('./api/models/Chatmessage'),
  Follower = require('./api/models/followersModel'),
  Viewer = require('./api/models/viewersModel'),
  favouriteFolder = require('./api/models/favouriteFoldersModel'),
  Folder = require('./api/models/folderModel'),
  HTMLGraphicElement = require('./api/models/HTMLGraphicElementModel'),
  Notification = require('./api/models/notificationModel'),
  Page = require('./api/models/paginaModel'),
  Hidden = require('./api/models/hiddenModel'),
  bodyParser = require('body-parser'),
  formidable = require('formidable'),
  fs = require('fs'),
  mv = require('mv'),
  path = require('path');
  //busboy = require('connect-busboy');
  

var morgan = require("morgan");
var jwt = require("jsonwebtoken");
var async = require("async");
var User = require('./api/models/userModel');
//var _ = require("underscore");
var config = require('./config.js');
const nodemailer = require('nodemailer');
const multer = require('multer');
var http = require('http').Server(app);
var randomstring = require("randomstring");
var requestt = require("request");
//var nodemailer = require('nodemailer');
// Password Encryption
const saltRounds = 3;
// Video multer
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: __dirname+'/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now());
  }
});
// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
  /*fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }*/
}).single('filetoupload');
const admin_base = "http://localhost:8000";
require('dotenv').config({path: __dirname + '.env'});
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useNewUrlParser: true } ); 
app.set('alexAplicationKey', config.secret);
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(morgan("dev"));
//app.use(busboy);
//app.use(upload());
app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


console.log("TEST getting assets dir from the environment file");
console.log(process.env.ASSETS_DIR);

/* utils */ 

async function interestGet(id) {
  let result = await Interest.findOne({_id: id}, function(error, interest) {
    if(error) {
      throw new Error(error);
    }
    return interest;
  });
  return result;
}

function compareValues(a, b) {
  for(var j = 0 ; j < a.length ; j++) {
    for(var g = 0 ; g < b.length ; g++) {
      if(a[j]==b[g]) {
        return 1;
      }
    }
  }
  return 0;
}

/* end utils*/

app.get('/nusertl', function(req, res) {
bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash('admin', salt, function(err, hash) {

            if (err) {
              //console.log('Something wrong');
              console.log(err);
              res.json({ success: false });
            }

            var new_user = new User({
              email: 'admin2@admnin.com',
              password: hash,
              admin: false
            });

            // save the sample user
            new_user.save(function(e) {
              if (e) {res.json({ success: false });}
                res.json({ success: true });
            });
        });
});
})
/* -- Add data -- */

app.get('/data_add', function(req,res){
      User.findOne({email:"pjose@nmail.com"}, function(a,b) {
        console.log(b);
        var as = new Notification({
              title: "Test test test 234",
              message: "XSAGSADGS",
              user: b,
              status: 1,
              seen: 0
          });
          as.save(function(err, as) {
            if (err)res.send(err);
            res.send("Done save");
          });
      });
});
/* -- Public [GET] Routes -- */
app.get('/', function(req,res){
    res.send("<h1>Welcome!</h1>");
});
/* -- Public [GET] Routes -- */
app.get('/service-test', function(req,res){
  res.send("<h1>Service test!</h1>");
});
app.get('/insert-first-mock-user', function(req,res){
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash('admin', salt, function(err, hash) { 
      var new_user = new User({ 
        email: 'admin@administrator.com', 
        password: hash,
        admin: false 
      });
      new_user.save(function(e) {
        if (e) {res.json({ success: false });}
        return res.json({'status':1, 'message':"Mock user added!"});
      });
    });
  });
});
app.get('/get-mock-user-token', function(req,res){
  // find the user
  User.findOne({
    email: req.query.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
        bcrypt.compare(req.query.password, user.password, function(err, respuesta) {
    // res == true

    if (err) {console.log(err);}

            if(respuesta==true){

                const payload = {
                admin: user.admin 
            };
                var token = jwt.sign(payload, app.get('alexAplicationKey'), {
                  //expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });

          }else{res.json({ success: false, message: 'Authentication failed. Wrong password.' });}
      });
    }
  });
});
app.get('/getCategories', function(req,res){
    Category.find({}, function(err, Category) {
      if (err)
        res.send(err);
      res.json(Category);
    });
});
app.get('/getSubCategories', function(req,res){
    Subcategory.find({}, function(err, Subcategory) {
      if (err)
        res.send(err);
      res.json(Subcategory);
    });
});
app.get('/getSubCategoriesByCategoryKey', function(req,res){
    Subcategory.find({}, function(err, Subcategory) {
      if (err)
        res.send(err);
      res.json(Subcategory);
    });
});
app.get('/getLevels', function(req,res){
    Level.find({}, function(err, Level) {
      if (err)
        res.send(err);
      res.json(Level);
    });
});
/*
app.get('/getGenders', function(req,res){
    Gender.find({}, function(err, Gender) {
      if (err)
        res.send(err);
      res.json(Gender);
    });
});
*/
app.get('/getCountries', function(req,res){
    Country.find({}, function(err, Country) {
      if (err)
        res.send(err);
      res.json(Country);
    });
});
app.get('/getStates', function(req,res){
    State.find({}, function(err, State) {
      if (err)
        res.send(err);
      res.json(State);
    });
});
app.get('/getCities', function(req,res){
    City.find({}, function(err, City) {
      if (err)
        res.send(err);
      res.json(City);
    });
});
app.get('/getSubsXcategory', function(req,res){
    Subcategory.find({category:req.body.category_id}, function(err, Subcategory) {
      if (err)
        res.send(err);
      res.json(Subcategory);
    });
});
app.get('/getEnterprise', function(req,res){
    Enterprise.find({}, function(err, Enterprise) {
      if (err)
        res.send(err);
      res.json(Enterprise);
    });
});
app.get('/userByEmail',function(req,res){
    var em = "";
    if (req.body.email) {em = req.body.email}
    if (req.query.email) {em = req.query.email} 
    User.findOne({email:em}, function(err, User) {
      if (err)
        res.send(err);
      res.json(User);
    });
});
app.get('/getTalentByUserId',function(req,res){
  //console.log(req.body);
    Talent.findOne({user:req.body.user}, function(err, User) {
      if (err)
        res.send(err);
      res.json(User);
    });
});
app.get('/getRecruiterByUserId',function(req,res){
    Recruiter.findOne({email:req.body.user}, function(err, User) {
      if (err)
        res.send(err);
      res.json(User);
    });
});
app.get('/getRecruiterTypes',function(req,res){
    RecruiterType.find({}, function(err, RecruiterType) {
      if (err)
        res.send(err);
      res.json(RecruiterType);
    });
});
app.get('/getUserVideoCatalogId',function(req,res){
  VideoCatalog.findOne({user: req.query.user_id}, function(err, vcs) {
    if (err)
      res.send(err);
    res.json(vcs);
  });
});
app.get('/getVideosFromCatalogId', function(req, res) {
  Video.find({}, function(err, list) {
    res.json(list);
  })
});
app.get('/pagesByName/:PageId', function(req,res) {
    Page.findOne({'name': req.params.PageId}, function(err, Page) {
      if (err) {
        res.send(err);
      }
      res.json(Page);
    });
});
app.get('/searchTalentByUid',function(req,res){
    Talent.findOne({user:req.query.uid}, function(err, Talent) {
      if (err)
        res.send(err);
      res.json(Talent);
    });
});
app.get('/searchRecruiterByUid',function(req,res){
    Recruiter.findOne({user:req.query.uid}, function(err, Recruiter) {
      if (err)
        res.send(err);
      res.json(Recruiter);
    });
});
app.get('/getDetailsVid', function(req, res) {
    Video.findOne({_id: req.query.vid}, function(err, response) {
      if(err)
        throw err;
      res.json(response);
    });
});
app.post('/saveFbUserToken', function(req, res) {
    User.findOne({_id: req.body.uid}, function(error, Usr) {
      if (error)
        res.send(error);
      Usr.fbAuthToken = req.body.fbAuthToken;
      Usr.save(function(err, u) {
        if (err)
          res.send(err);
        res.json(u);
      });
    });
});
app.get('/getFirstVideoFromCatalog', function(req, res) {
  VideoCatalog.find({user: req.query.tal}, function(err, vc) {
    res.json(vc[0]);
  });
});
app.get('/getTalentsVideosRandomList', function(req, res) {
    // Set 50 videos as limit because first page for recruiter is waiting for this response
    let limit = 50;
    let recruiterEmail = req.query.recruiter_id;
    User.findOne({email: recruiterEmail}, function(error, user) {
      Recruiter.findOne({user: user._id}, 
        (err, recruiter) => {
          if(err) {
            throw new Error(err)
          }
          let results = [];
          let k = 0;
          let v = recruiter.interest_list.forEach(element => {
            interestGet(element).then((data) => {
              results.push(data);
              if(k===(recruiter.interest_list.length-1)) {
                

                // return results array of objects with this form {perc: 0.6, data: {}}
                let final = [];
                // Set up comparison array
                let Categoria = [];
                let Nivel = [];
                let Subcategoria = [];
                let RangoXEdad = [];
                let Gender = [];
                for(let j = 0 ; j < results.length ; j++ ) {
                  let r = results[j];
                  //console.log(r.name);
                  if(r.name==="Categoria") {
                    Categoria.push(r.value);
                  }
                  if(r.name==="Nivel") {
                    Nivel.push(r.value);
                  }
                  if(r.name==="Subcategoria") {
                    Subcategoria.push(r.value);
                  }
                  if(r.name==="RangoXEdad") {
                    RangoXEdad.push(r.value);
                  }
                  if(r.name==="Gender") {
                    Gender.push(r.value);
                  }
                };
                Talent.find({}, function(errorTalent, talents) {
                  for(let o = 0 ; o < talents.length ; o++) {
                      let perc = 0;
                      console.log(talents[o].level);
                      console.log(Nivel);
                      console.log(Array.of(Nivel).indexOf(String(talents[o].level)));

                      if(compareValues(talents[o].category, Categoria)) {
                        perc += 0.30;
                      }
                      if(compareValues(talents[o].subcategory, Subcategoria)) {
                        perc += 0.40;
                      }
                      /*if(Array.of(Nivel).indexOf(String("'"+talents[o].level+"'")) > 0) {
                        perc += 0.10;
                      }*/
                      if(compareValues(talents[o].gender, Gender)) {
                        perc += 0.10;
                      }
                      if(perc>0.5) {
                        final.push({
                          perc: perc,
                          data: talents[o]
                        });
                        limit--;
                      }
                      if(o == (talents.length-1) || limit == 0) {
                          res.json(final);
                      }
                  }
                });
              }
              k++;
            });
          });
        }
      )
    });
});
app.post('/changePrivateStatus', function(req, res) {
    User.findOne({_id: req.body.id}, function(error, Usr) {
      if (error)
        res.send(error);
      var va = Usr.privateAccount;
      if (va===false || !va) {
        va = true;
      }else {
        va = false;
      }
      Usr.privateAccount = va;
      Usr.save(function(err, u) {
        if (err)
          res.send(err);
        res.json(u);
      });
    });
});
app.post('/changeStatus', function(req, res) {
    User.findOne({_id: req.body.id}, function(error, Usr) {
      if (error)
        res.send(error);
      var va = Usr.active;
      if (va===false || !va) {
        va = true;
      }else {
        va = false;
      }
      Usr.active = va;
      Usr.save(function(err, u) {
        if (err)
          res.send(err);
        res.json(u);
      });
    });
});

app.get('/get_rec_tal_by_usr_id', function(req, res) {
    Talent.findOne({user: req.query.id}, function(err1, Talent) {
        if (err1)
          res.send(err1);
        if (Talent) {
            res.json(Talent);
            //console.log(Talent);
        }else {
            Recruiter.findOne({user: req.query.id}, function(err2, Recruiter) {
                if (err2)
                    res.send(err2);
                if (Recruiter) {
                    res.json(Recruiter);
                    //console.log(Recruiter);
                }else {
                    res.json(null)
                }
            });
        }
    });
});

app.get('/tmp-token',function(req,res){

  const payload = {
          admin: true 
        };

        var token = jwt.sign(payload, app.get('alexAplicationKey'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });

});
/*
var routes = require('./api/routes/contentTextAreaRoutes'); //importing route
routes(app); //register the route
*/
/* -- End Public Routes -- */

/* -- Authentication Related Routes -- */
/*
app.post('/tmp', function(req, res) {
  var ps = req.body.password;
    bcrypt.hash(ps, saltRounds, function(err, hash) {

        if (err) {
          console.log('Something wrong');
          console.log(err);
          res.json({ success: false });
        }

        var new_user = new User({ 
          email: req.body.email, 
          password: hash,
          active: false,
          admin: false 
        });
      });
});
*/


/* Transporter for mail */

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev.jhons24@gmail.com',
    pass: 'sustitucionR68'
  }
});

/* Change information related the mail here */

app.post('/testtAuthRight',function(req,res) {
    Auth.find({username:req.body.username}).sort({Created_date: 'desc'}).limit(1).exec(function(err, docs) {
    //console.log("Acaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //console.log(docs); 
    //console.log(req.body.username);
//console.log("docs lenght"+docs.length);
    if (docs.length > 0) {

//console.log(docs[0]);
        if (err) {
          //console.log("hay error"+err);
            return res.json({ success: false, message: 'w' });
        }else {
          //console.log("docs username"+docs[0].email+"    "+req.body.username);
            if (docs[0].username==req.body.username && req.body.username) {
              //console.log("user igual");
              if (docs[0].ip_address==req.body.ip_address && req.body.ip_address) {
                //console.log("direccion igual");
                  if (docs[0].token==req.body.token && req.body.token) {
                    //console.log("token igual");
if (docs[0].ses_chunk==req.body.ses_chunk && req.body.ses_chunk) {
  //console.log("chunk igual");
  return res.json({ success: true, message: 'done' });
} else {
  return res.json({ success: false, message: 'w' });
}
                  }
                  else {res.json({ success: false, message: 'w' });}
              } else {res.json({ success: false, message: 'w' });}
            } else {res.json({ success: false, message: 'w' });}
        }


    }else {return res.json({ success: false, message: 'w' });}

    });
});

app.post('/tokenyTestor', function(req,res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('alexAplicationKey'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'w' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        return res.json({ success: true, message: 'done' });
      }
    });
  } else {
    return res.json({ success: false, message: 'w' });
  }
});


app.post('/createAuthData',function(req,res) {
  var auth = new Auth({
    username:req.body.username,
    ip_address:req.body.ip_address,
    token:req.body.token,
    ses_chunk:req.body.ses_chunk,
  });
  auth.save();
  return res.json({ success: true, message: 'done' });
});

app.get('/getUserType',function(req,res) {
  //console.log(req);
    var email = req.body.email || req.query.email;
    //console.log(req.body.email);
    if(email) {
    User.findOne({email:email}, function (err, user) {
      //console.log("!!!!!!    My usuariooooooooooooooooooooo");
      //console.log(user);
      if (err) return res.json({ success: false, message: 'w' });
      Talent.findOne({user:user._id},function (err,talent) {
        //console.log("Taloooooooooooooo");
      //console.log(talent);
        if (err) return res.json({ success: false, message: 'w' });
          if (talent) {
            return res.json({ success: true, message: 't' });
          }else {
            return res.json({ success: true, message: 'r' });
          }
      });
    });
  }
  else {
    return res.json({ success: false, message: 'w' });
  }
});





// Test videos and things

// De prueba -- funciono
/*
app.post('/new-video', function(req, res) {
    upload(req, res, (err) => {
        if(err){
          res.json({ success: false, message: 'e' });
        } else {
          if(req.file == undefined){
            res.json({ success: false, message: 'e' });
          } else {
            res.json({ success: true });
          }
        }
      });
});
*/

app.post('/new-video', function(req, res) {
  //console.log(req);
    upload(req, res, (err) => {
        if(err){
          res.json({ success: false, message: 'e' });
        } else {
          if(req.file == undefined){
            res.json({ success: false, message: 'e' });
          } else {

            // Antes de devolver la respuesta exitosa, guardar el video al catalogo

            //console.log('Aqui valores de la peticion');
            var username = req.body.username;
            var name = req.body.name;
            var description = req.body.description;
            //console.log(req.file.filename);
                User.findOne({
                  email: username
                }, function(er, user) {

                    Talent.findOne({user:user._id},function(error, talento){



                    VideoCatalog.findOne({talent:talento._id}, function(er, vc){

                        if (vc==null) {
                            var new_Video = new Video({ 
                              name: name, 
                              description: description,
                              url: req.file.filename                          // Descomentar
                            });
                            new_Video.save(function(err, Video) {
                              if (err)
                                res.json({ success: false, message: 'e' });
                                
                              // Crear video Catalogo agregar el video
                              // name, videos, talent
                              new_Ctal = new VideoCatalog({
                                  name: 'user_catalog' + '-' + Date.now() + '_' + username,
                                  user: talento._id
                              });
                              new_Ctal.videos.push(Video);
                              new_Ctal.save(function(err, Lsj){
                                if (err)
                                  res.json({ success: false, message: 'e' });
                                res.json({ success: true });
                              });

                            });
                        }else {
                            var new_Video = new Video({ 
                              name: name, 
                              description: description,
                              url: req.file.filename                          // Descomentar
                            });
                            new_Video.save(function(err, Video) {
                                if (err)
                                  res.json({ success: false, message: 'e' });
                                vc.videos.push(Video);
                                vc.save(function(err, Vs){
                                    res.json({ success: true });
                                });
                            });
                        }
                    });










                    });

                });
          }
        }
      });
});


app.post('/image-storag', function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {


            if (err) {
                res.json({ success: false, message: 'e' });
            }else {
                //console.log(fields);
                //var oldpath = files.logo_url.path;
                //var newpath = '/images/' + files.logo_url.name;
                var oldpath = files.imagestorage.path;
                var newpath = '/images_server/' + files.imagestorage.name;
                var storage_path = __dirname+newpath; 
                mv(oldpath, storage_path, function(err) {
                    if (err) {
                      res.json({ success: false, message: 'e' });
                    }else{
                      var modelo = fields.model;
                      var campo = fields.fd;
                      console.log(fields);
                      switch(modelo) {
                          case 'enterprise':
                          //var id = '5ac83656205cff0ad62634d1'; 
                          // Clave primaria empresa estatica para pruebas
                          var id = fields.id;
                              if (campo == 'logo_url') {
                                  console.log("ID: ");
                                  console.log(id);
                                  Enterprise.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    console.log("Doc");
                                    console.log("...");
                                    console.log(doc);
                                    //doc.logo_url = 'file://'+storage_path;
                                    doc.logo_url = process.env.ASSETS_DIR+'images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }else if(campo == 'img_principal') {
                                  Enterprise.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.img_principal = 'file://'+storage_path;
                                    doc.img_principal = process.env.ASSETS_DIR+'images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }else if(campo == 'favicon') {
                                  Enterprise.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.favicon = 'file://'+storage_path;
                                    doc.favicon = process.env.ASSETS_DIR+'images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }
                              break;
                          case 'job':
                              if (campo == 'imagen') {
                                  Job.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.logo_url = 'file://'+storage_path;
                                    doc.imagen = process.env.ASSETS_DIR+'images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }
                              break;
                          case 'talent':
                              // Distinto a Arriba retornador de url
                              if (campo=='profile_img') {
                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!111IMG BEING STORED!!!!!!!!!!!!!!!!!!!!!!!!!11');
                                console.log(files);
                                console.log(files.imagestorage.name);
                                  res.json({ success: true, message: process.env.ASSETS_DIR+'images/'+files.imagestorage.name });
                              }
                            break;
                          case 'recruiter':
                              // Distinto a Arriba retornador de url
                              if (campo=='profile_image') {
                                  res.json({ success: true, message: process.env.ASSETS_DIR+'images/'+files.imagestorage.name });
                              }
                            break;
                          case 'add':
                              if (campo == 'imagen') {
                                  var id = fields.id;
                                  Publicidad.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                      //doc.logo_url = 'file://'+storage_path;
                                      doc.banner_url = process.env.ASSETS_DIR+'images/'+files.imagestorage.name; 
                                      doc.save(function(){
                                        res.json({ success: true, message: 'done' });
                                      });
                                  });
                              }
                              break;
                          case 'n':
                              //code block
                              break;
                          default:
                              res.json({ success: false, message: 'e' });
                      }
                    }

                });
            }

    });
});

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('/images/:imgId', function(req,res) {
    var short_filename = req.params.imgId;
    var dir = path.join(__dirname, '/images_server/');
    var file = path.join(dir, short_filename);
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

/*
app.get('/image?imgId=/', function(req,res) {
    // Get imgId
    //req.route.query.imgId
});*/


/*
app.get('/user-list',function(req,res){
    var a = Talent.find({});
    res.json({success: true, message: a});
});
*/







// Prueba para los videos



// URL to get a video chunk





/*


app.get('/gvideo/:vId', function(req,res) {
  console.log(req.params.vId);
    res.json({ sucess:true, message:req.params.VideoId });
});


*/

app.get('/gvideo/:vId', function(req,res) {
    frq = "/uploads/"+req.params.vId;
    //var file = path.resolve(__dirname,frq);
    //console.log(file);
    //console.log(__dirname+frq);
    ruta = __dirname+frq;
    var file = ruta;
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
      .on("open", function() {
        stream.pipe(res);
      }).on("error", function(err) {
        res.end(err);
      });
  });
});






// Registra un nuevo usuario Talento en el sistema
app.post('/store-user-talent', function(req, res) {

  //console.log("Entra a store user talent");

  var ps = req.body.password;
    User.findOne({
        email: req.body.email
    }, function(er, user) {

    if (er) {
      console.log('Something wrong');
      console.log(er);
      res.json({ success: false });
    }

    if (!user) {

//console.log("Entra no tiene usuario");
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(ps, salt, function(err, hash) {

            if (err) {
              //console.log('Something wrong');
              console.log(err);
              res.json({ success: false });
            }

            var new_user = new User({ 
              email: req.body.email, 
              password: hash,
              admin: false 
            });

            // save the sample user
            new_user.save(function(e) {
              if (e) {res.json({ success: false });}
//NodeMailer
//console.log('Cat');
//console.log(req.body.subcategory);

              var addrP = JSON.parse(req.body.address);
              var address_created = new Address({
                country:addrP.country,
                state:addrP.state,
                city:addrP.city,
              });
              address_created.save();

              var new_talent = new Talent({ 
                name:req.body.name,
                birth_year:req.body.birth_year,
                gender:req.body.gender,
                address:address_created._id,
                level:req.body.level,
                category:req.body.category,
                subcategory:req.body.subcategory,
                profile_img:req.body.profile_img,
                user:new_user._id
              });

              new_talent.save(function(e){
                  if (e) {
                    return res.json({ success: false });
                  }else {
                    //console.log('User talent successfully save');
                    return res.json({ success: true });  
                  }
              });
              //console.log('User saved successfully');
              //res.json({ success: true });
            });

            // Fin generacion de contraseña
        });
      });
        //res.json({ success: false, message: 'aproved' });
    } else {
        return res.json({ success: false, message: 'unf' });
    }
  });
});

// Registra un nuevo usuario Reclutador en el sistema
app.post('/store-user-recruiter', function(req, res) {

  var ps = req.body.password;
    User.findOne({
        email: req.body.email
    }, function(er, user) {

    if (er) {
      //console.log('Something wrong');
      console.log(er);
      res.json({ success: false });
    }

    if (!user) {
      bcrypt.genSalt(saltRounds, function(err, salt) {  
        bcrypt.hash(ps, salt, function(err, hash) {

            if (err) {
              //console.log('Something wrong');
              console.log(err);
              res.json({ success: false });
            }

            var new_user = new User({ 
              email: req.body.email, 
              password: hash,
              admin: false 
            });

            // save the sample user
            new_user.save(function(e) {
              if (e) {res.json({ success: false });}
            //NodeMailer

              var addrP = JSON.parse(req.body.address);

              var address_created = new Address({
                country:addrP.country,
                state:addrP.state,
                city:addrP.city,
              });
              address_created.save(function(errAddressCreated, address_created) {
                  /* Begin */

                      if(req.body.oname && req.body.phone_number && req.body.website) {


                        var institution_created = new Institution({
                          name:req.body.oname,
                          phone_number:req.body.phone_number,
                          website:req.body.website,
                        });
                        institution_created.save((e_Institution, instP) => {
                          if(e_Institution) {
                            res.json(e_Institution);
                          }
                            var new_recruiter = new Recruiter({ 
                              name:req.body.name,
                              birth_year:req.body.birth_year,
                              gender:req.body.gender,
                              address:address_created,
                              institution:instP,
                              profile_image:req.body.profile_image,
                              user:new_user._id
                            });
                            

                            var niveles = String(req.body.level);
                            if(niveles!= "") {
                                var nuevo_interest = new Interest({
                                    name:'Nivel',
                                    value:niveles,
                                    recruiter:new_recruiter._id,
                                });
                                nuevo_interest.save();
                                new_recruiter.interest_list.push(nuevo_interest); 
                            }

                            let categoria = Array.from(req.body.category);
                            if(categoria !== undefined && categoria.length != 0) {
                                for (let item of categoria){
                                    var nueva_categoria = new Interest({
                                        name:'Categoria',
                                        value:item,
                                        recruiter:new_recruiter._id,
                                    }); 
                                    nueva_categoria.save(); 
                                    new_recruiter.interest_list.push(nueva_categoria);              
                                };
                            }

                            var subcategor = Array.from(req.body.subcategory);
                            if(subcategor !== undefined && subcategor.length != 0) {
                                for (let item of subcategor){
                                    var nuevo_subcategor = new Interest({
                                        name:'Subcategoria',
                                        value:item,
                                        recruiter:new_recruiter._id,
                                    });
                                    nuevo_subcategor.save();
                                    new_recruiter.interest_list.push(nuevo_subcategor);
                                }; 
                            }

                            var ages = Array.from(req.body.ages);
                            if(ages !== undefined && ages.length != 0) {
                              for (let item of ages){
                                  var rangh = '40+'; 
                                  switch(parseInt(item)) {
                                    case 1:
                                      rangh = '13-19';
                                      break;
                                    case 2:
                                      rangh = '20-29';
                                      break;
                                    case 3:
                                      rangh = '30-39';
                                      break;
                                  }
                                  var nuevo_ages = new Interest({
                                      name:'RangoXEdad',
                                      value:rangh,
                                      recruiter:new_recruiter._id,
                                  });
                                  nuevo_ages.save();     
                                  new_recruiter.interest_list.push(nuevo_ages);             
                              };
                            }
                            
                            var interestgender = Array.from(req.body.interestgender);
                            if(interestgender !== undefined && interestgender.length != 0) {
                              for (let item of interestgender){
                                var nuevo_ginterest = new Interest({
                                    name:'Gender',
                                    value:String(parseInt(item)),
                                    recruiter:new_recruiter._id,
                                });
                                nuevo_ginterest.save(); 
                                new_recruiter.interest_list.push(nuevo_ginterest);   
                              }
                            }


                            new_recruiter.save(function(e){
                                if (e) {
                                  res.json({ success: false });
                                }else {
                                  //console.log('User recruiter successfully save');
                                  res.json({ success: true });  
                                }
                            });
                            //console.log('User saved successfully');
                            //res.json({ success: true });
  
                          })

                      }else {
                        var new_recruiter = new Recruiter({ 
                          name:req.body.name,
                          birth_year:req.body.birth_year,
                          gender:req.body.gender,
                          address:address_created,
                          profile_image:req.body.profile_image,
                          user:new_user._id
                        });

                        var niveles = String(req.body.level);
                        if(niveles!= "") {
                            var nuevo_interest = new Interest({
                                name:'Nivel',
                                value:niveles,
                                recruiter:new_recruiter._id,
                            });
                            nuevo_interest.save();
                            new_recruiter.interest_list.push(nuevo_interest); 
                        }

                        let categoria = Array.from(req.body.category);
                        if(categoria !== undefined && categoria.length != 0) {
                            for (let item of categoria){
                                var nueva_categoria = new Interest({
                                    name:'Categoria',
                                    value:item,
                                    recruiter:new_recruiter._id,
                                }); 
                                nueva_categoria.save(); 
                                new_recruiter.interest_list.push(nueva_categoria);               
                            };
                        }

                        var subcategor = Array.from(req.body.subcategory);
                        if(subcategor !== undefined && subcategor.length != 0) {
                            for (let item of subcategor){
                                var nuevo_subcategor = new Interest({
                                    name:'Subcategoria',
                                    value:item,
                                    recruiter:new_recruiter._id,
                                });
                                nuevo_subcategor.save();
                                new_recruiter.interest_list.push(nuevo_subcategor);   
                            }; 
                        }

                        var ages = Array.from(req.body.ages);
                        if(ages !== undefined && ages.length != 0) {
                          for (let item of ages){
                              var rangh = '40+'; 
                              switch(parseInt(item)) {
                                case 1:
                                  rangh = '13-19';
                                  break;
                                case 2:
                                  rangh = '20-29';
                                  break;
                                case 3:
                                  rangh = '30-39';
                                  break;
                              }
                              var nuevo_ages = new Interest({
                                  name:'RangoXEdad',
                                  value:rangh,
                                  recruiter:new_recruiter._id,
                              });
                              nuevo_ages.save(); 
                              new_recruiter.interest_list.push(nuevo_ages);                  
                          };
                        }
                        
                        var interestgender = Array.from(req.body.interestgender);
                        if(interestgender !== undefined && interestgender.length != 0) {
                          for (let item of interestgender){
                            var nuevo_ginterest = new Interest({
                                name:'Gender',
                                value:String(parseInt(item)),
                                recruiter:new_recruiter._id,
                            });
                            nuevo_ginterest.save(); 
                            new_recruiter.interest_list.push(nuevo_ginterest);   
                          }
                        }
                        new_recruiter.save(function(e){
                            if (e) {
                              res.json({ success: false });
                            }else {
                              //console.log('User recruiter successfully save');
                              res.json({ success: true });  
                            }
                        });

                      }
                  /* [END] */

              }); // End address
            });

            // Fin g de hash
        });
      });
        //res.json({ success: false, message: 'aproved' });
    } else {
        res.json({ success: false, message: 'unf' });
    }
  });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
app.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
bcrypt.compare(req.body.password, user.password, function(err, respuesta) {
    // res == true

    if (err) {console.log(err);}

    if(respuesta==true){

          const payload = {
          admin: user.admin 
        };
        var token = jwt.sign(payload, app.get('alexAplicationKey'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });

    }else{res.json({ success: false, message: 'Authentication failed. Wrong password.' });}
});
    }
  });
});




/* -- Mobile App Authentication -- */

// Registra un nuevo usuario Talento en el sistema
app.post('/store_app_talent', function(req, res) {

  //console.log("Entra a store user talent");
  //console.log("Email : "+req.body.email);

  var ps = req.body.password;
    User.findOne({
        email: req.body.email
    }, function(er, user) {

    if (er) {
      console.log('Something wrong');
      console.log(er);
      res.json({ success: false });
    }

    if (!user) {

//console.log("Entra no tiene usuario");
bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(ps, salt, function(err, hash) {

            if (err) {
              //console.log('Something wrong');
              console.log(err);
              res.json({ success: false });
            }

            var new_user = new User({ 
              email: req.body.email, 
              password: hash,
              admin: false 
            });


            //console.log('array of categories');
            var array_category = JSON.parse(req.body.category);
            var array_subcategory = JSON.parse(req.body.subcategory);
            //console.log(array_category);
            //console.log(array_subcategory);

            new_user.save(function(e) {
              if (e) {res.json({ success: false });}

              var new_talent = new Talent({ 
                  name:req.body.name,
                  birth_year:req.body.birth_year,
                  gender:req.body.gender,
                 // address:address_created._id,
                  level:req.body.level,
                  category:array_category,
                  subcategory:array_subcategory,
                  profile_img:req.body.profile_img,
                  user:new_user._id
                });




                new_talent.save(function(e){
                    if (e) {
                      console.log(e);
                      return res.json({ success: false });
                      res.end();
                    }else {

                      //console.log('las categorias');
                      //console.log(new_talent._id);
                      //console.log(req.body.category);
                      return res.json({ success: true }); 

                      



                      
                    }
                });
            });
        });
      });
    } else {
        return res.json({ success: false, message: 'unf' });
    }
  });
});



// Registra un nuevo usuario Talento en el sistema
app.post('/store_app_recruiter', function(req, res) {

  //console.log("Entra a store user talent");
  //console.log("Email : "+req.body.email);

  var ps = req.body.password;
    User.findOne({
        email: req.body.email
    }, function(er, user) {

      //console.log(" Inside user");

    if (er) {
      //console.log('Something wrong');
      console.log(er);
      res.json({ success: false });
    }

    if (!user) {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(ps, salt, function(err, hash) {

          if (err) {
            //console.log('Something wrong');
            console.log(err);
            res.json({ success: false });
          }

          //console.log('Esta aqui 1'); 

          var new_user = new User({ 
            email: req.body.email, 
            password: hash,
            admin: false 
          });
          new_user.save(function(e) {
            if (e) {res.json({ success: false });}

            //console.log("Todo bien usuario");

            if(req.body.organization != "" || req.body.website != "" || req.body.phonenumber != ""){

              var new_institution = new Institution({ 
                name:req.body.organization,
                website:req.body.website,
                phone_number:req.body.phonenumber
              });
              new_institution.save(function(errore){
                  if (errore) {
                    console.log(errore);
                  }else {

                    //console.log("Guarda insitucion");



                      var new_recruiter = new Recruiter({ 
                        name:req.body.name,
                        recruitertype:req.body.recruiter_type,
                        institution:new_institution._id,
                        profile_image: req.body.profile_image,
                        user:new_user._id
                      });

                      new_recruiter.save(function(e){
                          if (e) {
                            res.json({ success: false });
                          }else {
                            //console.log('User recruiter successfully save');
                            res.json({ success: true });  
                          }
                      });


                  }
              });

            }else {

              var new_recruiter = new Recruiter({ 
                name:req.body.name,
                recruitertype:req.body.recruiter_type,
                user:new_user._id
              });

              new_recruiter.save(function(e){
                  if (e) {
                    return res.json({ success: false });
                  }else {
                    //console.log('User recruiter successfully save');
                    return res.json({ success: true });  
                  }
              });


            }

              //res.json({ success: true, message: 'success' });
          });
      });
      });

        
    } else {
        return res.json({ success: false, message: 'unf' });
    }
  });
});


/* -- End Authentication Routes -- */














































/* Website Skautin-web public Endpoints */



app.get('/update_talent_details_from_wsk', function(req, res) {
    var calls = [];
    calls.push(function(callback) {
        Talent.findOne({_id: req.query._id}, function(err, t) {
            callback(null, t);
        });
    });
    calls.push(function(callback) {
        Country.findOne({_id: req.query.countryId}, function(err, c) {
            callback(null, c);
        });
    });
    calls.push(function(callback) {
        State.findOne({_id: req.query.stateId}, function(err, state) {
            callback(null, state);
        });
    });
    calls.push(function(callback) {
        City.findOne({_id: req.query.cityId}, function(err, city) {
            callback(null, city);
        });
    });
    calls.push(function(callback) {
        Level.findOne({_id: req.query.level}, function(err, lvl) {
            callback(null, lvl);
        });
    });
    async.parallel(calls, function(err, r) {
        if (err)
            res.json(err);
        var lk = {
            'talent': r[0],
            'country': r[1],
            'state': r[2],
            'city': r[3],
            'level': r[4]
        }
        var addr = new Address({
              country: lk.country,
              state: lk.state,
              city: lk.city,
        });
        addr.save(function(er, newAddress) {
            //console.log(req.query._id);
            //console.log("Talent id used");
            Talent.findOne({_id: req.query._id}, function(err3, TalentSaved) {
                TalentSaved.name = req.query.name;
                TalentSaved.gender = req.query.gender;
                TalentSaved.birth_year = req.query.birth_year;
                TalentSaved.level = lk.level;
                TalentSaved.address = newAddress;
                TalentSaved.save(function(err4, tSaved) {
                    res.json(tSaved);
                });
            });
        });
    });
});

app.get('/update_talent_img', function(req, res) {
    User.findOne({email: req.query.email}, function(error3, Usr) {
        Talent.findOne({user:Usr._id}, function(error, t) {
            t.profile_img = req.query.image;
            t.save(function(error2, saved) {
                res.json(saved);
            });
        });
    });
});




/* END */



















































app.get('/get_catalogs', function(req,res){
    User.findOne({email:req.query.user}, function(er, u) {
        VideoCatalog.find({}, function(error, vc) {
            res.json(vc);
        });
    });
});

app.get('/compare_categs', function(req,res){
    var compare_uno = req.query.cat_id;
    var compare_dos = req.query.user_id;
    //console.log(compare_uno);
    Talent.findOne({user:compare_uno}, function(er, tal) {
        if (tal) {
            User.findOne({email:compare_dos}, function(errore2, user2) {
                //console.log("bien user 2 "+user2._id);
                Talent.findOne({user:user2._id}, function(er, tal1) {
                    if (tal1) {
                        for (var i = 0; i < tal['category'].length; i++) {
                            for (var v = 0; v < tal1['category'].length; v++) {
                                if (tal['category']==tal1['category']) {
                                  res.json(true);
                                }
                            }
                        }
                    }
                });
                Recruiter.findOne({user:user2._id}, function(err, rec1) {
                    if (rec1) {
                      //console.log("2");
                      //console.log(rec1);
                        let found = rec1['categories'].some(r=> tal['categories'].includes(r));
                        //console.log(found);
                    }
                });
            })
        }
      });
    /*User.findOne({_id:compare_uno}, function(errore, user1){
      Talent.find({user:user1._id}, function(er, tal) {
          User.findOne({email:compare_dos}, function(errore2, user2) {
            Talent.find({user:user2._id}, function(er, tal1) {
                let found = tal1['categories'].some(r=> tal['categories'].includes(r));
                console.log(found);
            });
            Recruiter.find({user:user2._id}, function(err, rec) {
                let found = rec['categories'].some(r=> tal['categories'].includes(r));
                console.log(found);
            });
          })
      });
      Recruiter.find({user:user1._id}, function(err, rec) {

      });
    });*/
});









/* CHAT ROUTES */




app.get('/full-message-thread', function(req,res) {
    var email = req.body.email || req.query.email;
    //console.log(email);
    if(email) {
      User.findOne({'email':email}, function (err, user) {
        //console.log(user);
        //console.log(err);

          if (user) {
            Chatthread.find({user:user._id},function(error, thread){
              return res.json({'status':1, 'message':thread});
              res.end();
            });
          }else {
              return res.json({'status':0, 'message':'no_user'});
              res.end();
          }

      });
    }    
});



/*
app.get('/find_thread_wit_users' , function(req, res) {
    Chatthread.findOne({}, function(er1, thread1) {

    });
});
*/



app.post('/new_message', function(req,res) {
    // First capture the data

    var message_text = req.body.texto;
    var status  = req.body.status;
    var to_user  = req.body.to;
    var from_user = req.body.from;

    //console.log(to_user);
    //console.log(from_user);


    var new_message = new Chatmessage({
        text: message_text,
        status:status,
        user:from_user
    });
    new_message.save(function(err, m) {
          if (err)
            res.send(err);
          User.findOne({email:to_user},function(err1,user_receiver){
              User.findOne({email:from_user},function(err2,user_sender){
                  //console.log('users');
                  //console.log(user_receiver);
                  //console.log(user_sender);

                  //return res.send(1);
                  Chatthread.findOne({'user':user_sender._id,'to_user':user_receiver._id},function(error,thread){
                      //console.log(thread);
                        if (thread) {
                            thread.messages.push(m);
                            Chatthread.update({_id:thread._id}, { $push: { messages: m },last_message:m}, null, function(e,updated){
                                return res.json({'status':1,'message':'Thread updated'});
                                res.end();
                            });
                        }else {
                            var chatthread = new Chatthread({
                              user:user_sender._id,
                              to_user:user_receiver._id,
                              last_message:m,
                              $push: { messages: m }
                            });
                            chatthread.messages.push({ messages: m });
                            chatthread.save(function(e, new_thread){
                                return res.json({'status':1,'message':'Save new'});
                                res.end();
                            });
                        }
                    });


              });
          });
    });
});

app.post('/store_new_message_get', function(req,res) {
    // First capture the data

    var message_text = req.body.message_text;
    var status  = req.body.status;
    var to_user  = req.body.to_user;
    var from_user = req.body.from_user;

    //console.log(to_user);
    //console.log(from_user);


    var new_message = new Chatmessage({
        text: message_text,
        status:status,
        user:from_user
    });
    new_message.save(function(err, m) {
          if (err)
            res.send(err);
          User.findOne({email:to_user},function(err1,user_receiver){
              User.findOne({email:from_user},function(err2,user_sender){
                  //console.log('users');
                  //console.log(user_receiver);
                  //console.log(user_sender);

                  //return res.send(1);
                  Chatthread.findOne({'user':user_sender._id,'to_user':user_receiver._id},function(error,thread){
                      //console.log(thread);
                        if (thread) {
                            thread.messages.push(m);
                            Chatthread.update({_id:thread._id}, { $push: { messages: m },last_message:m}, null, function(e,updated){
                                return res.json({'status':1,'message':'Thread updated'});
                                res.end();
                            });
                        }else {
                            var chatthread = new Chatthread({
                              user:user_sender._id,
                              to_user:user_receiver._id,
                              last_message:m,
                              $push: { messages: m }
                            });
                            chatthread.messages.push({ messages: m });
                            chatthread.save(function(e, new_thread){
                                return res.json({'status':1,'message':'Save new'});
                                res.end();
                            });
                        }
                    });


              });
          });
    });
});


app.get('/get-conversation', function(req,res) {
    var from_user = req.query.from;
    var to_user = req.query.to;

    return res.json({'status':1, 'message':'done'});
});

app.get('/get_single_message',function(req,res) {
    var m = req.query.mesage_id;
    //console.log(m);
    //console.log('out');
    Chatmessage.findOne({_id:m},function(err,r){
      if (r) {
        return res.json({'status':1, 'message':r});
        res.end();
      }else {
        return res.json({'status':0, 'message':'no_user'});
        res.end();
      }
    });
});

app.get('/user_message_list', function(req,res){
    var user_mail  = req.query.email;
    let returned_list = [];
    User.findOne({email:user_mail},function(err1,usr){
      console.log(usr._id);
        Chatthread.find({'user':usr._id},function(err2,ct) {
            if (ct) {
                res.json({'status':1, 'message':ct});
                res.end();
            } 
        });
    });
    
});


app.get('/get_thread_by_id', function(req,res) {
    Chatthread.findOne({_id:req.query.thread_id}, function(err2, thread) {
        if (err2) {
          res.json({'status':0,'message':'fallo'});
        }else {
          res.send(thread);
        }

    });
});


app.get('/thread_message_detail', function(req,res){


var msg_id = req.query.msg_id;
var t_id = req.query.t_id;
Chatmessage.findOne({_id:msg_id},function(err3,cm){
    if (cm) {
          User.findOne({email:cm.user},function(err7, u){
            Talent.findOne({user:u._id},function(err5,t){
              if(t){
                var obj = {'thread_id':t_id,'usr_image':t.profile_img,'usr_name':t.name,'msg_txt':cm.text,'date':cm.Created_date};
                return res.json({'status':1,'message':obj});
                res.end();
              }
            });
            Recruiter.findOne({user:u._id},function(err6,r){
              if(r){
                var obj = {'thread_id':t_id,'usr_image':r.profile_img,'usr_name':r.name,'msg_txt':cm.text,'date':cm.Created_date};
                return res.json({'status':1,'message':obj});
                res.end();
              }
            });
          });
        } // End cm is not null
    });
});

app.get('/thread_messages_with_limit', function(req, res) {

    //var begin = req.query.begin;
    var last = req.query.last;
    var thread_id = req.query.thread_id;
    var flag = 0;
    var result = [];


    Chatthread.findOne({_id:thread_id},function(error, thread){

      //console.log(thread);


        thread.messages.forEach((msj) => {

          if (flag < last) {
            var classe = 'received';
            if (msj.user == req.query.myuser) {
              classe = 'sended';
            }
              var aux_model = {
                  'text': msj.text,
                  'status': msj.status,
                  'date': msj.Created_date,
                  'user': msj.user,
                  'class': classe
              };
              result.push(aux_model);
          }
          flag++;

        });


        res.send(result);
        res.end();

    });
});

app.get('/thread_messages_with_limit2', function(req, res) {

    //var begin = req.query.begin;
    var last = req.query.last;
    var thread_id = req.query.thread_id;
    var flag = 0;
    var result = [];


    Chatthread.findOne({_id:thread_id},function(error, thread){
        //  , null, {sort: '-Created_date'}
        //console.log("Result:  ");
        //console.log(thread.messages);
        res.json({'status':1,'message':thread.messages});
    });
});

app.get('/thread_messages_with_limit2_order_by_created_date', function(req, res) {
    var last = req.query.last;
    var thread_id = req.query.thread_id;
    var flag = 0;
    var result = [];
    var calls = [];
          Chatthread.findOne({_id:thread_id},function(error, thread){
              var calls2 = [];
              thread.messages.forEach((obj) => {

                calls.push(function(callback) {

                    Chatmessage.findOne({_id:obj.messages}, function(er, msg) {

                        result.push(msg);
                        callback(null, msg);
                        

                    });


                  });

                });

                    async.parallel(calls, function(err, r) {
                      /* this code will run after all calls finished the job or
                         when any of the calls passes an error */
                      if (err)
                          return console.log(err);
                      console.log(r);



                      r.sort(function(a, b) {
                            a = new Date(a.Created_date);
                            b = new Date(b.Created_date);
                            return a>b ? -1 : a<b ? 1 : 0;
                        }).reverse()
                      var fin = [];
                      for (var i = 0; i < r.length; i++) {
                        fin.push({"messages":r[i]._id});
                      }
                      res.json({
                        'status':1,
                        'message':fin
                    });
                  });
                
            });
});

app.post('/store_new_message_improved', function(req, res) {
    var from_user = req.body.sender;
    var too_user =  req.body.receiver;
    var message  = req.body.message;
    var email_temp = req.body.email_temp;

    // check thread 1

    Chatthread.findOne({user:from_user,to_user:too_user},function(error, thread){
      if (thread) {
        // Exists add to messages.
        console.log("1->");
        var new_message = new Chatmessage({
            text: message,
            status:'send',
            user:email_temp
        });
        new_message.save(function(err, m) {
            thread.messages.push({'messages':m._id});
            thread.save();
        });
      }else {
        // Doens't exist create new one.
        console.log("3->");
        var chatthread = new Chatthread({
            user:from_user,
            to_user:too_user
        });
        chatthread.save(function(err, cm) {
            var new_message = new Chatmessage({
                text: message,
                status:'send',
                user:email_temp
            });
            new_message.save(function(err2, m) {
                cm.last_message = m;
                cm.messages.push({'messages':m._id});
                cm.save();
            });
        });
      }
    });

    // check thread 2

    Chatthread.findOne({user:too_user,to_user:from_user},function(error, thread){
      if (thread) {
        console.log("2->");
        var new_message = new Chatmessage({
            text: message,
            status:'send',
            user:email_temp
        });
        new_message.save(function(err, m) {
            thread.messages.push({'messages':m._id});
            thread.save();
        });
        // Exists add to messages.
      }else {
        // Doens't exist create new one.
        console.log("4->");
        var chatthread = new Chatthread({
            user:too_user,
            to_user:from_user
        });
        chatthread.save(function(err, cm) {
            var new_message = new Chatmessage({
                text: message,
                status:'send',
                user:email_temp
            });
            new_message.save(function(err2, m) {
                cm.last_message = m;
                cm.messages.push({'messages':m._id});
                cm.save();
            });
        });
      }
    });

    res.json({'status':1,'message':'thread message saved'});

});

app.get('/get_new_messages', function(req,res) {

    var msgid = req.query.message_id;

    var calls = [];

    calls.push(function(callback) {

        Chatmessage.findOne({_id:msgid}, function(err, first_message) {

            Chatthread.findOne({_id:req.query.thread_id}, function(err2, thre) {


                var msgdate = new Date(first_message.Created_date);
                console.log("Msg date");
                console.log(msgdate);
                reso = [];

                var calls3 = [];

                calls2.push(function(callback3) {

                      thre['messages'].forEach((msk)=> {
                        var calls2 = [];
                        calls2.push(function(callback2) {
                            Chatmessage.findOne({_id:msk.messages}, function(err3, m) {

                              if (new Date(m.Created_date)>msgdate) {
                                  reso.push(m);
                                  callback2(null, m);
                              }

                            });
                        });

                        async.parallel(calls2, function(errAsd, r) {
                                  if (errAsd)
                                      return console.log(errAsd);
                                    //console.log("sec request!");
                                  //console.log(r[0]);
                                  reso.push(r[0]);

                                  //callback(null, reso);

                                  callback3(null, reso);

                              });

                        

                    });
                });

                async.parallel(calls3, function(err, result) {
                        if (err)
                            return console.log(err);
                          console.log("CONSOLE LOG DEBUG.");
                        console.log(result.sort(function(a, b) {
                                          a = new Date(a.Created_date);
                                          b = new Date(b.Created_date);
                                          return a>b ? -1 : a<b ? 1 : 0;
                                      }).reverse());
                        res.json({'status':1,'message':result.sort(function(a, b) {
                                          a = new Date(a.Created_date);
                                          b = new Date(b.Created_date);
                                          return a>b ? -1 : a<b ? 1 : 0;
                                      }).reverse()});
                    });


                

            });
                /*
                var cutoff = new Date(first_message['Created_date']);
                Chatmessage.find({Created_date: {$lt: cutoff.getDate()}}, function(error, mhlist) {
                    res.json({'status':1,'message':mhlist});
                });
                */
          });
        //Job.find({ title: search_txt }, function(err,jbos) {callback(null, jbos);});
      });

    

});

/* END ROUTES */





app.get('/get_user_b_email', function(req, res) {
  var email1 = req.query.email;
  User.findOne({email:email1}, function(err2, user){
      res.send(user);
  });
});





app.get('/unfollow_users', function(req, res) {
    var u1 = req.query.follower;
    var u2 = req.query.following;
    Follower.remove({$or:[{a:u1,b:u2},{a:u2,b:u1}]}, function(error, follow) {
      //console.log(error);
      //console.log(follow);
        /*if (follow) {
            var tmp = follow; 
            follow.remove();
            res.json({'status':1,'message':tmp});
        }*/
        
    });
});






/* USER OR TALENT INFORMATION */


app.get('/get_user_user',function(req,res) {
    var email = req.query.usr;
    User.findOne({'_id':email},function(err,u){
      res.send(u);
    });
});

app.get('/get_talent_by_user_email',function(req,res) {
    var email = req.query.email;
    User.findOne({'email':email},function(err,u){
      Talent.findOne({'user':u._id},function(err,tal){
        res.send(tal);
      });
    });
});


app.get('/get_recruiter_by_user_email',function(req,res) {
    var email = req.query.email;
    User.findOne({'email':email},function(err,u){
      Recruiter.findOne({'user':u._id},function(err,rec){
        res.send(rec);
      });
    });
});

app.get('/get_ins_by_id', function(req, res) {
    var id = req.query.id;
    Institution.findOne({_id:id}, function(er, i) {
        res.json({'status':1, 'message':i});
    })
});

app.post('/update_rec_institu_info', function(req,res) {
    if (req.body.name && req.body.website && req.body.phone && req.body.rec) {

      Recruiter.findOne({_id:req.body.rec}, function(err, recruiter) {
        Institution.update({ _id: recruiter.institution}, { $set: { name: req.body.name, website: req.body.website, phone: req.body.phone  }}, function(er, rec) {
              //console.log('Enter 1');
              //console.log(res.json(rec));
          });
      });
      

    }
});

app.get('/register_new_recruiter_interest', function(req,res) {

      Recruiter.findOne({_id:req.query.rec}, function(err, recruiter) {
          //res.json(recruiter);
          Interest.findOne({value:req.query.cat}, function(er, intrs) {
              if (intrs) {
                  //res.json({s:'category_exists'});
              }else {
                  Category.findOne({_id:req.query.cat}, function(error1, c) {
                      var new_interest = new Interest({
                        'name':c.name,
                        'value':c._id,
                        'recruiter':req.query.rec
                      });
                      new_interest.save();
                      recruiter.interest_list.push(new_interest);
                      recruiter.save(true);
                      res.json({s:'success'});
                  });
              }
          });
          Interest.findOne({value:req.query.subcat}, function(er2, intrs2) {
              if (intrs2) {
                  res.json({s:'already_exists'});
              }else {
                  Subcategory.findOne({_id:req.query.subcat}, function(error1, sub) {
                      var new_interest = new Interest({
                        'name':sub.name,
                        'value':sub._id,
                        'recruiter':req.query.rec
                      });
                      new_interest.save();
                      recruiter.interest_list.push(new_interest);
                      recruiter.save(true);
                      res.json({s:'success'});
                  });
              }
          });
      });
});

app.get('/register_new_talent_interest', function(req,res) {

      Talent.findOne({_id:req.query.rec}, function(err, recruiter) {
          //res.json(recruiter);
          Category.findOne({_id:req.query.cat}, function(er, intrs) {
                  recruiter.category.push(intrs._id);
                  recruiter.save();
                  res.json({s:'success'});
          });
          Subcategory.findOne({_id:req.query.subcat}, function(er2, intrs2) {
                  recruiter.subcategory.push(intrs2._id);
                  recruiter.save();
                  res.json({s:'success'});
          });
      });
});

app.get('/list_interest_loader', function(req, res) {
    Recruiter.findOne({_id:req.query.rec}, function(er, recru) {
        Interest.find({recruiter:recru._id}, function(errors, interestss){
          if (interestss) {
              res.json({s:interestss});
          }else {
              res.json({s:'empty!'});
          }
        });
    });
});

app.get('/search_all', function(req, res) {
    var to_search = req.query.to_search;
    
    Category.find({}, function(err1, cats_all) {
        Subcategory.find({}, function(err2, subcats_all) {
            Level.find({}, function(err3, levels_all) {
                Interest.find({}, function(err4, interest_all) {

                    //res.json({s:cats_all});

                    var calls = [];
                    calls.push(function(callback) {
                        Job.find({}, function(err,q){
                            var j = 0 ;
                            var arr  = [];
                            
                            while(j<q.length) {
                                var resvar = q[j];
                                j++; 
                                var cas = {}; 
                                var scas = {};
                                var lvl = '';
                                /*resvar.category.forEach((ctg)=> {
                                    console.log();
                                    var picked = lodash.filter(cats_all, x => x._id == String(ctg));
                                    cas.push(picked[0]);
                                  });
                                resvar.subcategory.forEach((ctg)=> {
                                    var picked = lodash.filter(subcats_all, x => x._id == String(ctg));
                                    scas.push(picked[0]);
                                  });*/
                                var picked1 = lodash.filter(cats_all, x => x._id == String(resvar.category));
                                cas = picked1[0];
                                var picked2 = lodash.filter(subcats_all, x => x._id == String(resvar.subcategory));
                                scas = picked2[0];
                                var picked = lodash.filter(levels_all, x => x._id == String(resvar.level));
                                lvl = picked[0];
                                //lvl = levels_all.map(function(e) { return e['_id']; }).indexOf(String(resvar.level));
                                //var obj = {'_id':resvar._id,'name':resvar.name,'birth_year':resvar.birth_year,'gender':resvar.gender,'categories':cas,'subcategories':scas,'level':lvl};
                                //arr.push(obj);
                                var obj = {'typee':'job','_id':resvar._id,'name':resvar.name,'birth_year':resvar.birth_year,'gender':resvar.gender,'categories':cas,'subcategories':scas,'level':lvl, 'img':resvar.imagen};
                                if (String(resvar.name).indexOf(String(to_search))>-1) {
                                    console.log("condition 1: ");
                                    console.log(resvar.name);
                                    console.log(to_search);
                                    console.log('--------------');
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(resvar.description).indexOf(String(to_search))>-1) {
                                  console.log("condition 2: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(resvar.requirements).indexOf(String(to_search))>-1) {
                                  console.log("condition 3: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(lvl).indexOf(String(to_search))>-1) {
                                  console.log("condition 4: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (cas && String(cas.name).indexOf(String(to_search))>-1) {
                                  console.log("condition 4: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (scas && String(scas.name).indexOf(String(to_search))>-1) {
                                  console.log("condition 4: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }
                            }

                            callback(null, arr);
                        });
                    });
                    calls.push(function(callback) {
                        Recruiter.find({}, function(err,q){
                            var j = 0 ;
                            var arr  = [];
                            
                            while(j<q.length) {
                                var resvar = q[j];
                                j++; 
                                var cas = []; 
                                var lvl = '';
                                resvar.interest_list.forEach((ctg)=> {
                                    console.log();
                                    var picked = lodash.filter(interest_all, x => x._id == String(ctg));
                                    cas.push(picked[0]);
                                  });
                                var obj = {'typee':'recruiter','_id':resvar._id,'name':resvar.name,'birth_year':resvar.birth_year,'gender':resvar.gender, 'interests':cas, 'img':resvar.profile_image};
                                if (String(resvar.name).indexOf(String(to_search))>-1) {
                                    console.log("condition 1: ");
                                    console.log(resvar.name);
                                    console.log(to_search);
                                    console.log('--------------');
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(resvar.gender).indexOf(String(to_search))>-1) {
                                  console.log("condition 2: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(resvar.birth_year).indexOf(String(to_search))>-1) {
                                  console.log("condition 3: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else {
                                    var found1 = false;
                                    for(var i = 0; i < cas.length; i++) {
                                        if (cas[i] && cas[i].hasOwnProperty('name')) {
                                            if (String(cas[i].name).indexOf(to_search) >-1) {

                                                found1 = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (found1) {
                                      console.log("condition 5: ");
                                        arr.push(obj);
                                        //callback(null, obj);
                                        continue;
                                    }
                                }
                            }
                            callback(null, arr);
                        });
                    });
                    calls.push(function(callback) {
                        Talent.find({}, function(err,q){
                            var j = 0 ;
                            var arr  = [];
                            
                            while(j<q.length) {
                                var resvar = q[j];
                                j++; 
                                var cas = []; 
                                var scas = [];
                                var lvl = '';
                                resvar.category.forEach((ctg)=> {
                                    console.log();
                                    var picked = lodash.filter(cats_all, x => x._id == String(ctg));
                                    cas.push(picked[0]);
                                  });
                                resvar.subcategory.forEach((ctg)=> {
                                    var picked = lodash.filter(subcats_all, x => x._id == String(ctg));
                                    scas.push(picked[0]);
                                  });
                                var picked = lodash.filter(levels_all, x => x._id == String(resvar.level));
                                lvl = picked[0];
                                //lvl = levels_all.map(function(e) { return e['_id']; }).indexOf(String(resvar.level));
                                //var obj = {'_id':resvar._id,'name':resvar.name,'birth_year':resvar.birth_year,'gender':resvar.gender,'categories':cas,'subcategories':scas,'level':lvl};
                                //arr.push(obj);
                                var obj = {'typee':'talent','_id':resvar._id,'name':resvar.name,'birth_year':resvar.birth_year,'gender':resvar.gender,'categories':cas,'subcategories':scas,'level':lvl, 'img':resvar.profile_img};
                                if (String(resvar.name).indexOf(String(to_search))>-1) {
                                    console.log("condition 1: ");
                                    console.log(resvar.name);
                                    console.log(to_search);
                                    console.log('--------------');
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(resvar.gender).indexOf(String(to_search))>-1) {
                                  console.log("condition 2: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(resvar.birth_year).indexOf(String(to_search))>-1) {
                                  console.log("condition 3: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else if (String(lvl).indexOf(String(to_search))>-1) {
                                  console.log("condition 4: ");
                                    arr.push(obj);
                                    //callback(null, obj);
                                    continue;
                                }else {
                                    var found1 = false;
                                    for(var i = 0; i < cas.length; i++) {
                                        if (cas[i] && cas[i].hasOwnProperty('name')) {
                                            if (String(cas[i].name).indexOf(to_search) >-1) {

                                                found1 = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (found1) {
                                      console.log("condition 5: ");
                                        arr.push(obj);
                                        //callback(null, obj);
                                        continue;
                                    }
                                    var found2 = false;
                                    for(var i = 0; i < scas.length; i++) {
                                        if (scas[i] && cas[i].hasOwnProperty('name')) {
                                            if (String(scas[i].name).indexOf(to_search) >-1) {
                                                found2 = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (found2) {
                                      console.log("condition 6: ");
                                        arr.push(obj);
                                        //callback(null, obj);
                                        continue;
                                    }
                                }
                            }

                            callback(null, arr);
                        });
                    });
                    async.parallel(calls, function(errAsd, result) {
                        if (errAsd) {
                            console.log(errAsd);
                        }
                        var arrayh = result[0];
                        arrayh = arrayh.concat(result[1]);
                        arrayh = arrayh.concat(result[2]);
                        var currentIndex = arrayh.length, temporaryValue, randomIndex;
                        // While there remain elements to shuffle...
                        while (0 !== currentIndex) {

                          // Pick a remaining element...
                          randomIndex = Math.floor(Math.random() * currentIndex);
                          currentIndex -= 1;

                          // And swap it with the current element.
                          temporaryValue = arrayh[currentIndex];
                          arrayh[currentIndex] = arrayh[randomIndex];
                          arrayh[randomIndex] = temporaryValue;
                        }
                        res.json(arrayh);
                    });





                });
            });
        });
    });
});

app.get('/list_interest_loader_tal', function(req, res) {
    Talent.findOne({_id:req.query.rec}, function(er, recru) {
        var calls = [];




        var selected = []; 
        selected = recru.category;
        selected = selected.concat(recru.subcategory);
        //console.log("f result");
        //console.log(selected);
        var n = [];
        selected.forEach((s)=> {
          n.push(String(s));
        });


        calls.push(function(callback) {
            Category.find({}, function(errors, interestss){
              if (interestss) {
                callback(null, interestss);
              }
            });
        });
        calls.push(function(callback) {
            Subcategory.find({}, function(errors, interestss){
              if (interestss) {
                callback(null, interestss);
              }
            });
        });
        async.parallel(calls, function(errAsd, result) {
                if (errAsd)
                    return console.log(errAsd);

                    var farr = result[0];
                    farr = farr.concat(result[1]);
                    var newarr = [];
                    var k = 0;
                    while(k<farr.length){
                      console.log("F");
                      console.log("----------------------------------------");
                      console.log(selected);
                      console.log(farr[k]._id);
                      console.log("E");
                      if (n.indexOf(String(farr[k]._id)) > -1) {
                        console.log("Exists!");
                        newarr.push(farr[k]);
                      }
                      k++;
                    }

                    if (newarr.length>0) {
                      res.json({s:newarr});
                    }else {
                      res.json({s:'empty!'});
                    }

                });
    });
});


app.get('/get_user_info_by_id',function(req,res) {
    var email = req.query.email;
    User.findOne({'_id':email},function(err,u){
      if(u){
        Talent.findOne({'user':u._id},function(err1,t){
          if(t){return res.json({'status':1,'message':t});res.end();}
        });
        Recruiter.findOne({'user':u._id},function(err2,r){
          if(r){return res.json({'status':1,'message':r});res.end();}
        });
      }else {
        return res.json({'status':1,'message':'no_user'});
        res.end();
      }
    });
});

app.get('/check_cat_or_sub', function(req, res) {
    Category.findOne({_id:req.query.check_id}, function(er, result) {
        if (result) {
            res.json({s:'category'});
        }else {
            res.json({s:'subcategory'});
        }
    })
});

app.get('/friendly_delete_element', function(req, res) {
    Interest.deleteOne({_id:req.query.interest_id}, function(er, interest) {
        if (er) {
          //console.log(er);
        }
        res.json(interest);
    })
});

app.get('/friendly_delete_element_tal', function(req, res) {
    console.log(req.query.interest_id);
    console.log(req.query.tal_id);
    Talent.findOne({_id:req.query.tal_id}, function(err, tal){
      if(tal) {
          var arr = tal.category;
          var n = 0;
          var temp = [];
          while(n<arr.length) {
            if (arr[n]!=req.query.interest_id) {
              temp.push(arr[n]);
            }
            n++;
          }
          console.log("FIN");
          console.log(temp);
          tal.category = temp;
          tal.save();
          res.json(tal);
      }
    });
    Talent.findOne({_id:req.query.tal_id}, function(err, tal) {
      if(tal) {
          var arr = tal.subcategory;
          var n = 0;
          var temp = [];
          while(n<arr.length) {
            if (arr[n]!=req.query.interest_id) {
              temp.push(arr[n]);
            }
            n++;
          }
          console.log("FIN");
          console.log(temp);
          tal.subcategory = temp;
          tal.save();
          res.json(tal);
      }
    });
    /*Talent.update({_id:req.query.tal_id}, { $pull: { "category": { _id: req.query.interest_id } } }, {}, function(err, tal){
      res.json(tal);
    });
    Talent.update({_id:req.query.tal_id}, { $pull: { "subcategory": { _id: req.query.interest_id } } }, {}, function(err, tal) {
      res.json(tal);
    });*/
});

app.get('/send_email', function(req,res) {

  var typee = req.query.type;
  if (typee==1) {
      requestt.get(admin_base+'/assets/emails_templates/login_template.html', function (error, response, body) {
          //if (!error && response.statusCode == 200) {
          if (error) {
            console.log(error);
          }
          var to = req.query.to;
          if (response.body) {
              var emailhtml = response.body; 
              var mailOptions = {
                //from: 'dev.jhons24@gmail.com',
                  from: 'supportsecurity@skautin.com',
                  to: req.query.to,
                  subject: 'Password request change!',
                  replyTo: 'noreply@noreply.com',
                  html: emailhtml
                };

                transporter.sendMail(mailOptions, function(err, info){
                  if (error) {
                    console.log(error);
                  } else {
                    //console.log('Email sent: ' + info.response);
                    //var res = 'Email sent: ' + info.response;
                    //res.json({s:res});
                  }
                });
                //var res = 'Email sent: ' + info.response;
                res.json({s:'send'});
          }
      });
  }
});

app.get('/vac_details', function(req,res) {
    var vid = req.query.id;

    Job.findOne({_id: vid}, function(err, job) {
      Category.findOne({_id:job.category}, function(errcat, cat) {
          Subcategory.findOne({_id:job.subcategory}, function(errsub, sub) {
            City.findOne({_id:job.city}, function(errcity, cit) {
                State.findOne({_id:job.state}, function(errstate, stat) {
                      Country.findOne({_id:job.country}, function(countryerr, cnt) {
                          Level.findOne({_id:job.level}, function(lvlerr, lvl) {
                              var ret = {
                                "Created_date":job['Created_date'],
                                "_id": job['_id'],
                                "name": job['name'],
                                "title":job['title'],
                                "description":job['description'],
                                "requirements":job['requirements'],
                                "category":cat['name'],
                                "subcategory":sub['name'],
                                "city":cit['name'],
                                "state":stat['name'],
                                "country":cnt['name'],
                                "level":lvl['name'],
                                "representant": job['representant'],
                                "__v": 0
                              };
                              res.json(ret);
                          });
                      });
                  });
              });
          });
      });
    });
    
});



/* END USER OR TALENT INFORMATION */






app.get('/get_user_details_by_video', function(req, res) {
    var v = req.query.video_id;
    var splitted = v.split("/");
    splitted = splitted[(splitted.length-1)];
    Video.findOne({url:splitted}, function(err,r) {
        VideoCatalog.findOne({_id:r.catalog_id}, function(err1, vc) {
            //console.log(vc);
            User.findOne({_id:vc.user}, function(err3, u) {
                res.json(u);
            });
        });
    });
});



app.get('/save_follower', function(req, res) {
    usera = req.query.user1;
    userb = req.query.user2;
    User.findOne({email:usera}, function(err, usera) {
        User.findOne({email:userb}, function(err2, userb){
            var new_Follower = new Follower({a:usera._id,b:userb._id});
            new_Follower.save(function(err, Follower) {
              if (err)
                res.send(err);
              res.json({'status':1,'message':'success'});
            });
        })
    });
});

app.get('/get_follower_list', function(req, res) {
    usera = req.query.usr;
    User.findOne({email:usera}, function(err, usera) {
        Follower.find({a:usera._id}, function(error, result){
          if (result) {
            res.json({'status':'1','message':result});
          }
        });
    });
});

app.get('/get_following_list', function(req, res) {
    usera = req.query.usr;
    User.findOne({email:usera}, function(err, usera) {
        Follower.find({b:usera._id}, function(error, result){
          if (result) {
            res.json({'status':'1','message':result});
          }
        });
    });
});

app.get('/add_view', function(req, res) {
    viewer = req.query.viewer;
    usera = req.query.user;
    User.findOne({email:usera}, function(err, usera) {
      User.findOne({email:viewer}, function(err, viewer) {
          Viewer.findOne({a:usera,b:viewer}, function(error, result) {
            if (result) {
              var visits_new = result.visits + 1;
              Viewer.update({ _id: result._id }, { $set: { visits: visits_new }}, function(err,Viewer) {
                if (err)
                  res.send(err);
                res.json(Viewer);
              });
            }else {
                var new_Viewer = new Viewer({a:usera,b:viewer,visits:0});
                new_Viewer.save(function(err, Viewer) {
                  if (err)
                    res.send(err);
                  res.json(Viewer);
                });
            }
          });
      });
    });
});



app.get('/get_views', function(req, res) {
    user = req.query.usr;
    //console.log(user);
    User.findOne({email:user}, function(err, usera) {
      //console.log(usera);
        Viewer.find({a:usera._id}, function(error, views) {
            if (views) {
                res.json({'success':1,'message':views});
            }
        });
    });
});


/* MEDIA APP REQUEST */






/*    Works Good           
app.post('/upload_video_from_app', function(req,res) {
  console.log('new request');
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

            if (err) {
                res.json({ success: false, message: 'e' });
            }else {
              console.log(fields);
              //console.log(fields.file);
              //console.log(fields.file[0]);
              console.log(files);
                var oldpath = files.file.path;
                  var newpath = '/images_server/' + files.file.name;
                  var storage_path = __dirname+newpath; 
                  mv(oldpath, storage_path, function(err) {
                      if (err) {
                        res.json({ success: false, message: 'e' });
                      }else{


                          console.log('Finish uploading');
                          res.json({'status':1, 'message':newpath});


                      }
                    });
            }
          });
      });
*/


app.post('/upload_video_from_app', function(req,res) {
  //console.log('new request');
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

            if (err) {
                res.json({ success: false, message: 'e' });
            }else {
              var tmp_usr = fields.username;
              User.findOne({email:tmp_usr}, function (err2, u) {
                  VideoCatalog.findOne({user:u._id}, function(err1, vc) {
                      if (!vc) {
                          //console.log('Correcto no tiene catalog');
                          var new_VideoCatalog = new VideoCatalog(
                              {
                                  'name':u.email+'_playlist',
                                  'user':u._id
                              }
                          );
                          new_VideoCatalog.save(function(err4, vCatalog) {
                              var v_name = randomstring.generate({length: 30,charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJHLMNOPQRSTUWXYZ1234567890'});
                              var oldpath = files.file.path;
                              var newpath = '/uploads/' + v_name;
                              var storage_path = __dirname+newpath; 
                              mv(oldpath, storage_path, function(err) {
                                  if (err) {
                                    res.json({ success: false, message: 'e' });
                                  }else{


                                      var new_video = new Video({
                                        name:'gasdgasdg', 
                                        url:v_name, 
                                        catalog_id: vCatalog._id, 
                                        status: 'on_hold'}
                                      );
                                      new_video.save(function(err5, vid) {
                                        //console.log(err5);
                                        //console.log(vid);
                                        vCatalog.videos.push(vid);
                                        vCatalog.save();
                                        //VideoCatalog.update({_id:vid.catalog_id}, { $push: { videos: vid }}, done);
                                        res.json({'status':1, 'message':vid});
                                        res.end();
                                      });

                                  }
                                });
                          });
                      }else {
                          //  Agregar video al catalog
                          var v_name = randomstring.generate({length: 30,charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJHLMNOPQRSTUWXYZ1234567890'});
                          var oldpath = files.file.path;
                          var newpath = '/uploads/' + v_name;
                          var storage_path = __dirname+newpath; 
                          mv(oldpath, storage_path, function(err) {
                              if (err) {
                                res.json({ success: false, message: 'e' });
                              }else{

                                  var new_video = new Video({
                                    name:'xsxsxssxsxsxsaatta', 
                                    url:v_name, 
                                    catalog_id: vc._id, 
                                    status: 'on_hold'}
                                  );
                                  new_video.save(function(err5, vid) {
                                    vc.videos.push(vid);
                                    vc.save();
                                    res.json({'status':1, 'message':'new video catalog created'});
                                    res.end();
                                  });
                              }
                            });
                      }
                  });
              });
              /*VideoCatalog.findOne({user:u._id}, function(err1, vc) {
                  console.log(vc);
                  console.log(err);
              });*/
                  /*
                  var oldpath = files.file.path;
                  var newpath = '/images_server/' + files.file.name;
                  var storage_path = __dirname+newpath; 
                  mv(oldpath, storage_path, function(err) {
                      if (err) {
                        res.json({ success: false, message: 'e' });
                      }else{


                          console.log('Finish uploading');
                          res.json({'status':1, 'message':newpath});


                      }
                    });
                    */
            }
          });
      });






































app.post('/image_storage_for_app', function(req,res) {
  //console.log('new request');
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

            if (err) {
                res.json({ success: false, message: 'e' });
            }else {
              //console.log(fields);
              //console.log(fields.file);
              //console.log(fields.file[0]);
              //console.log(files);
                var oldpath = files.file.path;
                  var newpath = '/images_server/' + files.file.name;
                  var storage_path = __dirname+newpath; 
                  mv(oldpath, storage_path, function(err) {
                      if (err) {
                        res.json({ success: false, message: 'e' });
                      }else{
                          /*console.log('fin');
                          res.end();*/

                          var modelo = fields.model;
                          var campo = fields.fd;
                          switch(modelo) {
                              //var id = fields.id
                              /*case 'job':
                                  if (campo == 'imagen') {
                                      Job.findById(id, function (err, doc) {
                                        if (err) 
                                          res.json({ success: false, message: 'e' });
                                        //doc.logo_url = 'file://'+storage_path;
                                        doc.imagen = 'http://127.0.0.1:3002/images/'+files.imagestorage.name; 
                                        doc.save(function(){
                                          res.json({ success: true, message: 'done' });
                                        });
                                      });
                                  }
                                  break;*/
                              case 'talent':
                                  // Distinto a Arriba retornador de url
                                  if (campo=='profile_img') {
                                      res.json({ success: true, message: process.env.ASSETS_DIR+'images/'+files.file.name });
                                  }
                                break;
                              case 'recruiter':
                                  // Distinto a Arriba retornador de url
                                  if (campo=='profile_image') {
                                      res.json({ success: true, message: process.env.ASSETS_DIR+'images/'+files.file.name });
                                  }
                                break;
                              default:
                                  res.json({ success: false, message: 'e' });
                          }







                      }
                    });
            }
          });
    /*var form = new formidable.IncomingForm();
    form.parse(req.body.formm, function (err, fields, files) {

            if (err) {
                res.json({ success: false, message: 'e' });
            }else {
                console.log(fields);
                //var oldpath = files.logo_url.path;
                //var newpath = '/images/' + files.logo_url.name;
                var oldpath = files.imagestorage.path;
                var newpath = '/images_server/' + files.imagestorage.name;
                var storage_path = __dirname+newpath; 
                mv(oldpath, storage_path, function(err) {
                    if (err) {
                      res.json({ success: false, message: 'e' });
                    }else{
                      var modelo = fields.model;
                      var campo = fields.fd;
                      switch(modelo) {
                          case 'enterprise':
                          var id = '5ac83656205cff0ad62634d1'; // Clave primaria empresa estatica para pruebas
                          //var id = fields.id
                              if (campo == 'logo_url') {
                                  Enterprise.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.logo_url = 'file://'+storage_path;
                                    doc.logo_url = 'http://127.0.0.1:3002/images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }else if(campo == 'img_principal') {
                                  Enterprise.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.img_principal = 'file://'+storage_path;
                                    doc.img_principal = 'http://127.0.0.1:3002/images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }else if(campo == 'favicon') {
                                  Enterprise.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.favicon = 'file://'+storage_path;
                                    doc.favicon = 'http://127.0.0.1:3002/images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }
                              break;
                          case 'job':
                              if (campo == 'imagen') {
                                  Job.findById(id, function (err, doc) {
                                    if (err) 
                                      res.json({ success: false, message: 'e' });
                                    //doc.logo_url = 'file://'+storage_path;
                                    doc.imagen = 'http://127.0.0.1:3002/images/'+files.imagestorage.name; 
                                    doc.save(function(){
                                      res.json({ success: true, message: 'done' });
                                    });
                                  });
                              }
                              break;
                          case 'talent':
                              // Distinto a Arriba retornador de url
                              if (campo=='profile_img') {
                                  res.json({ success: true, message: 'http://127.0.0.1:3002/images/'+files.imagestorage.name });
                              }
                            break;
                          case 'recruiter':
                              // Distinto a Arriba retornador de url
                              if (campo=='profile_image') {
                                  res.json({ success: true, message: 'http://127.0.0.1:3002/images/'+files.imagestorage.name });
                              }
                            break;
                          case 'n':
                              //code block
                              break;
                          default:
                              res.json({ success: false, message: 'e' });
                      }
                    }

                });
            }

    });*/
});



















/* END OF MEDIA APP*/



/* BEGIN CONNECTION RELATED ROUTES */



    app.get('/connection_f_user', function(req, res) {
        var searched_user = req.query.usr_email;
        var r = [];
        User.findOne({email: searched_user}, function(err, user) {



            Connection.find().and([{$or: [{leftside_user: user._id}, {rightside_user: user._id}]}, {status: "Connected"}]).exec(function(err2, connections) {

                if (connections) {


                  res.json({'status':1, 'message':connections});


                }
            });
        });
    });

    app.get('/connection_f_user_by_id', function(req, res) {
        var b2 = req.query.b2;
        var a2 = req.query.a2;
        //console.log(b2);
        //console.log(a2);
        User.findOne({email:a2}, function(w,t){

            var other_user_id = t._id;

            Connection.count({$or: [{ $and: [{leftside_user: b2}, {rightside_user: other_user_id}] },{ $and: [{rightside_user: b2}, {leftside_user: other_user_id}] }]}, function(error, c) {
                    if (error) {
                      res.end();
                    }
                    if (c) {
                        res.json({'status':1, 'result':c});
                    }else{
                        res.json({'status':0, 'result':0});
                    }
                });


        });
    });




    app.get('/pending_connection_f_user', function(req, res) {
        var searched_user = req.query.usr_email;
        var r = [];
        User.findOne({email: searched_user}, function(err, user) {



            Connection.find().and([{leftside_user: user._id},{status: "Pending"}]).exec(function(err2, connections) {

                if (connections) {


                  res.json({'status':1, 'message':connections});


                }
            });
        });
    });



    app.get('/get_full_address', function(req, res) {
        User.findOne({email:req.query.email}, function(err, user) {
            Talent.findOne({user:user._id}, function(err1, talent) {
                let fulladdr = '';
                Country.findOne({}, function(err2, country) {
                    State.findOne({}, function(err3, state) {
                        City.findOne({}, function(err4, city) {
                            res.json({'status':1, 'message':country['name']+" , "+state['name']+" , "+city['name']});
                        });

                    });
                });
            });
            Recruiter.findOne({user:user._id}, function(err2, recruiter) {
                Country.findOne({}, function(err2, country) {
                    State.findOne({}, function(err3, state) {
                        City.findOne({}, function(err4, city) {
                            res.json({'status':1, 'message':country['name']+" , "+state['name']+" , "+city['name']});
                        });

                    });
                });
            });
        });
    });



    app.post('/update_rec', function(req, res) {

        if (req.body.country || req.body.state || req.body.city || req.body.address_line) {

          var address = {country: req.body.country, state: req.body.state, city: req.body.city, street: req.body.address_line}
          Recruiter.update({ _id: req.body.rec_id }, { $set: { name: req.body.name, about_info: req.body.about, address: address  }}, function(er, rec) {
              //console.log('Enter 1');
              //console.log(res.json(rec));
          });



        }else {


          Recruiter.update({ _id: req.body.rec_id }, { $set: { name: req.body.name, about_info: req.body.about }}, function(er, rec) {
              //console.log('Enter 2');
              //console.log(res.json(rec));
          });


        }
    });



    app.get('/profiles_for_same_catsorsubs', function(req, res) {
              var searched_user = req.query.usr_email;
              var r = [];
              User.findOne({email: searched_user}, function(err, user) {


                  // Solo es para reclutador buscar el reclutador y luego recorrer todos los intereses
                  // y buscar talentos o reclutadores en esos mismos intereses


                  res.json({'status':1, 'message':r});
              });
    });

    /* Statistics */

    app.get('/count_followers', function(req,res) {
        var email = req.query.usr;
        User.findOne({'email':email},function(err,user) {
            if(err)
              res.end();
            if (user) {
                Follower.count({b:user._id}, function(error, c) {
                    if (error) {
                      res.end();
                    }
                    res.json({'status':1, 'result':c});
                });
            }else {
              res.json(null);

            }
        });
    });

    app.get('/count_viewers', function(req,res) {
        var email = req.query.usr;
        User.findOne({'email':email},function(err,user) {
            if(err)
              res.end();
            if (user) {
                Viewer.findOne({a:user._id}, function(error, c) {
                    if (error) {
                      res.end();
                    }
                    res.json({'status':1, 'result':c.visits});
                });
            }else {
                res.json(null);
            }
        });
    });

    app.get('/count_following', function(req,res) {
        var email = req.query.usr;
        User.findOne({'email':email},function(err,user) {
            if(err)
              res.end();
            if (user) {
                Follower.count({a:user._id}, function(error, c) {
                    if (error) {
                      res.end();
                    }
                    res.json({'status':1, 'result':c});
                });
            }else {
                res.json(null);
            }
        });
    });

    app.get('/count_connections', function(req,res) {
        var email = req.query.usr;
        User.findOne({'email':email},function(err,user) {
            if(err)
              res.end();
            if (user) {
                Connection.count({$and:[{$or: [{leftside_user: user._id}, {rightside_user: user._id}]}, {status: "Connected"}]}, function(error, c) {
                    if (error) {
                      res.end();
                    }
                    res.json({'status':1, 'result':c});
                });
            }else {
                res.json(null);
            }
        });
    });



    app.get('/sugest_me_a_profile', function(req, res) {
              var searched_user = req.query.usr_email;
              //console.log('email coming : '+searched_user);
              User.findOne({email: searched_user}, function(err, user) {
                  //console.log(' user id : '+user._id);

                  // Solo es para reclutador buscar el reclutador y luego recorrer todos los intereses
                  // y buscar talentos o reclutadores en esos mismos intereses


                  /*var flag = Math.round(Math.random()*3);
                  if (flag==0) {
                      // Ordena por fecha Create datetime
                  }else if(flag==1) {
                      // Ordena por nombre alfabetico
                  }else if(flag==2) {
                      // Ordena por categoria
                  }else {
                      // Ordena por subcategoria
                  }*/

                  //console.log('va a entrar a reclutador');

                  Recruiter.findOne({user:user._id}, function(err3, rec) {
                    //console.log('Encontro reclutador');
                    //console.log(rec);
                    //console.log(rec.interest_list);
                      if (rec.interest_list!=undefined) {
                        //console.log('distinto undefined');
                          var all_suggestions = [];
                          var control = 0;
                          rec.interest_list.forEach((interest) => {
                            //console.log('cada interest');
                            //console.log(interest);
                              Interest.find({}, function(err4, interst) {
                                //console.log('Encontro un interes');
                                //console.log(interst);
                                  Talent.find({}, function(err5, tal) {
                                      /*if (interst.name=="category") {
                                          if(tal.category.indexOf(interst.value) > -1){
                                            if (control<50)
                                              all_suggestions.push(tal);
                                            }
                                      }else if(interst.name=="subcategory"){
                                          if(tal.category.indexOf(interst.value) > -1) {
                                            if (control<50)
                                              all_suggestions.push(tal);
                                          }
                                      }else if(interst.name=="gender"){
                                          if (tal.gender == interst.value) {
                                            if (control<50)
                                              all_suggestions.push(tal);
                                          }
                                      }*/
                                      control++;
                                  });
                              });
                          });
                          //console.log('resultado final sugerencias');
                          //console.log(all_suggestions);
                          res.json({'status':1, 'message': all_suggestions});
                          res.end();
                      }else {
                            res.json({'status':0, 'message': 'empty'});
                          res.end();
                      }
                      
                  });
              });
    });



    app.get('/change_user_entrance_status', function(req, res) {
        var em = req.query.email;
        User.findOneAndUpdate({email: em}, {$set:{first_entrance:false}}, {new: true}, function(err, doc){
            if(err){
                res.json({'status':1,'message':'model could not be update'});
            }
            res.json({'status':0,'success':true});
        });
    });




/* END CONNECTION RELATED ROUTES */



/* VIDEO ROUTES FOR APP */

app.get('/gvideo_app/:vId', function(req,res) {
    frq = "/uploads/"+req.params.vId;
    //var file = path.resolve(__dirname,frq);
    //console.log(file);
    //console.log(__dirname+frq);
    ruta = __dirname+frq;
    var file = ruta;
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
      .on("open", function() {
        stream.pipe(res);
      }).on("error", function(err) {
        res.end(err);
      });
  });
});



app.get('/get_v_info', function(req, res) {
    var u = req.query.usr;

    User.findOne({email: u}, function(err, user) {
        Talent.findOne({user:user._id}, function(err2, tal) {
            /*console.log(tal.category);
            console.log(tal.subcategory);
            console.log(tal.level);*/

            var find_and_condition = false;
            var limit_searces = 0;

            while(limit_searces < 50 && find_and_condition == false) {

              // Get the count of all users
              Talent.count().exec((count) =>  {

                // Get a random entry
                var random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                  Talent.findOne().skip(random).exec(
                    (result) => {

                        if (result) {

                          var rs = tal.category.some(function (v) {
                            return result.category.indexOf(v) >= 0;
                          });
                          //console.log('Prueba rs');
                          //console.log(rs);

                        }else {
                          //console.log('no result');
                        }
                    }, (er) => {console.log(er);})
                })
              limit_searces = limit_searces + 1;
            }

        });
    });
});




/* END VIDEO ROUTES FOR APP */


/* SEARCH ROUTES NEW */


app.get('/general_search_1', function(req,res){
    //var regex = new RegExp(req.s_term, 'i');  // 'i' makes it case insensitive
    var return_result = [];
    Talent.find({name:{ $regex: req.query.s_term, $options: 'i' }}, function(err,q){
        //return res.send(q);
        return_result.push(q);
        res.json({'status':1, 'message': return_result});
    });
});

app.get('/general_search_2', function(req,res){
    /*var regex = new RegExp(req.s_term, 'i');*/  // 'i' makes it case insensitive
    var return_result = [];
    Recruiter.find({name:{ $regex: req.query.s_term, $options: 'i' }}, function(err2,q2){
        //return res.send(q);
        return_result.push(q2);
        res.json({'status':1, 'message': return_result});
    });
});


app.get('/acceptConnections', function(req,res){
      //console.log(u);
      //console.log(req.query.user_1);
      Talent.findOne({_id:req.query.user_1},function(error, talent) {
          if (talent) {
            User.findOne({_id:talent.user},function(err, u) {
                User.findOne({email:req.query.user_2}, function(error, second){
                  //console.log('response 1');
                    Connection.findOne({ $or: [     { $and: [ {leftside_user: u._id}, {rightside_user: second._id} ] }  ,   { $and: [ {leftside_user: second._id}, {rightside_user: u._id} ] }       ] }, function(error,result) {
                          //console.log(result);
                          Connection.update({_id:result._id}, {$set: { status: "Connected" }}, {upsert: true}, function(err){
                              res.json(err);
                          });
                      });
                });
            });
          }
      });

      Recruiter.findOne({_id:req.query.user_1},function(error, recruiter) {
          if (recruiter) {
             User.findOne({_id:recruiter.user},function(err, u) {
                  User.findOne({email:req.query.user_2}, function(error, second){
                    //console.log('response 2');
                      Connection.findOne({ $or: [     { $and: [ {leftside_user: u._id}, {rightside_user: second._id} ] }  ,   { $and: [ {leftside_user: second._id}, {rightside_user: u._id} ] }       ] }, function(error,result) {
                          //console.log(result);
                          Connection.update({_id:result._id}, {$set: { status: "Connected" }}, {upsert: true}, function(err){
                              res.json(err);
                          });
                      });
                  });
              });
          }
      });
});


/* END SEARCH ROUTES */



/* SEARCH ROUTES */

app.get('/search_by_criteria', function(req, res) {

    //return res.json("xxx");
    //res.send('Hello World!');
    var search_txt = req.query.search_txt;
    var email = req.query.email;

    var search_txt = "/^"+search_txt;

    //console.log("termino de busqueda -> "+search_txt);

    //var entry_condition = Math.round(Math.random()*5);

    var calls = [];

    calls.push(function(callback) {
      Talent.find({ name: { $regex: search_txt, $options: 'i'} }, function(err,tlents){
        //console.log(tlents);
        callback(null, tlents);});
    });
    calls.push(function(callback) {
      Recruiter.find({ name: search_txt }, function(err,recruiters){callback(null, recruiters);});
    });
    calls.push(function(callback) {
      Job.find({ title: search_txt }, function(err,jbos) {callback(null, jbos);});
    });

    async.parallel(calls, function(err, result) {
        /* this code will run after all calls finished the job or
           when any of the calls passes an error */
        if (err)
            return console.log(err);
        //console.log(result);
        return res.send("Fin");
    });

    /*Talent.find({ name: /^Bro/ }, function(err,tlents){
    });
    Recruiter.find({ name: /^Bro/ }, function(err,recruiters){
    });
    Jobs.find({ title: /^Bro/ }, function(err,jbos){   
    });*/

    /*var obj = {
        'talents':[{'one':1},{'two':2}],
        'recruiters':[{'one':1},{'two':2}],
        'jobs':[{'one':1},{'two':2}]
    };

    return res.json(obj);*/

    //return res.json({entry_condition:entry_condition});

    /* First search on previos contacts */

    /* Search Randomly */



    /*if(entry_condition==1) {
        // Talent

        Talent.findOne(
        {$or:[ 
          {'name': { $regex: '.*' + search_txt + '.*', $options: "i" } },
          {'level': { $regex: '.*' + search_txt + '.*', $options: "i" } } 
        ]}, function(err, doc) {
            if(doc) {
              res.json(doc);
            res.end();
            }
              else {
                res.json("null");
            res.end();
              }
            
        });
    }else if(entry_condition==2) {
        // Recruiter

        Recruiter.findOne(
        {$or:[ 
          {'name': { $regex: '.*' + search_txt + '.*', $options: "i" } },
          {'level': { $regex: '.*' + search_txt + '.*', $options: "i" } }
        ]}, function(err, doc) {
          if (doc) {
              res.json(doc);
            res.end();
          }else {
              res.json("null");
            res.end();
          }
            
        });
    }else if(entry_condition==3) {
        // Category

        Category.findOne({'name': { $regex: '.*' + search_txt + '.*' } } , function(err, doc) {
            var rand_search = Math.round(Math.random()*3);

            if(doc) {

            if (rand_search==1) {
                Talent.findOne({category: doc._id}, function(err2, tal) {
                    if(tal) {
                        res.json(tal);
                    res.end();
                    }else {
                        res.json("null");
                        res.end();
                    }
                    
                });
            }else if(rand_search==2) {
                Recruiter.findOne({category: doc._id}, function(err2, rec) {
                   if(rec) {
                        res.json(rec);
                    res.end();
                    }else {
                        res.json("null");
                        res.end();
                    }
                });
            }else {
                Job.findOne({category: doc._id}, function(err2, job) {
                    if(job) {
                        res.json(job);
                    res.end();
                    }else {
                        res.json("null");
                        res.end();
                    }
                });
            }

            }else {
              res.json("null");
                        res.end();
            }
        });

    }else if(entry_condition==4) {
        // Sub-category

        Subcategory.findOne({'name': { $regex: '.*' + search_txt + '.*' } }, function(err, doc) {
            var rand_search = Math.round(Math.random()*3);


            if (doc) {

            if (rand_search==1) {
                Talent.findOne({subcategory: doc._id}, function(err2, tal) {
                    if(tal) {
                        res.json(tal);
                    res.end();
                    }else {
                        res.json("null");
                        res.end();
                    }
                });
            }else if(rand_search==2) {
                Recruiter.findOne({subcategory: doc._id}, function(err2, rec) {
                    if(rec) {
                        res.json(rec);
                    res.end();
                    }else {
                        res.json("null");
                        res.end();
                    }
                });
            }else {
                Job.findOne({subcategory: doc._id}, function(err2, job) {
                    if(job) {
                        res.json(job);
                    res.end();
                    }else {
                        res.json("null");
                        res.end();
                    }
                });
            }

          }else {
              res.json("null");
                        res.end();
          }
        });

    }else {
        // Job

        Job.findOne(
        {$or:[ 
          {'name':{ $regex: '.*' + search_txt + '.*' }}, 
          {'description':{ $regex: '.*' + search_txt + '.*' }} 
        ]}, function(err, doc) {
            if(doc) {
                res.json(job);
                res.end();
            }else {
                res.json("null");
                res.end();
            }
        });
    }*/

});

/* END SEARCH ROUTES */ 


app.get('/isUserFollowing', function(req,res){
    User.findOne({email:req.query.follower}, function (err100, left){
        User.findOne({email:req.query.following}, function (err200, right){

          Connection.find({leftside_user: left, rightside_user: right}, function(err2,result1){
            //console.log("r1");
            //console.log(result1);
            if (result1.length==0) {
                Connection.find({rightside_user: right, leftside_user: left}, function(err2,result2){
                  //console.log("r2");
                  //console.log(result2);
                    if (result2.lenght==0) {
                        res.send("0");
                    }else {
                        res.send("1");
                    }
                });  
                  }else {
                      res.send("1");
                  }
              });

        });
    });
});


app.get('/get_address_info_recruiter_to_show',function(req, res) {
    var recruiter_id = req.query.recid;
    Recruiter.findOne({_id:recruiter_id}, function(err,r){
      console.log(r.name);
        var finalstring = '';
        City.findOne({_id:r.address.city}, function(err1, c){
            finalstring += c.name;
            State.findOne({_id:r.address.state}, function(err2, s){
                if (s) {
                    //Done
                    if (finalstring=="" && s=="") {
                        finalstring += 'noshow';
                    }else if (finalstring!="") {
                        finalstring += ', ' + s.name;
                    }else{
                        finalstring += s.name;
                    }
                }else{
                    if (finalstring=="") {
                        finalstring += 'noshow';
                    }
                }
                // return here...
                res.json({'message':finalstring});
            });
        });
    });
});

app.get('/get_publicity_queue',function(req, res) {
    var finalres = [];
    Publicidad.find({relevance:["Top"]}, function(er, p4) {
      if(p4)
        finalres = finalres.concat(p4);
      Publicidad.find({relevance:["Very very Relevant"]}, function(er, p3) {
        if(p3)
          finalres = finalres.concat(p3);
        Publicidad.find({relevance:["Very Relevant"]}, function(er, p2) {
          if(p2)
            finalres = finalres.concat(p2);
          Publicidad.find({relevance:["Medium"]}, function(er, p1) {
            if(p1)
              finalres = finalres.concat(p1);
            Publicidad.find({relevance:["Low"]}, function(er, p0) {
                if(p0)
                  finalres = finalres.concat(p0);


                res.json({'message':finalres});
 

            });    
          });
        });  
      }); 
    });
});

app.get('/get_jobs_publicity_categories_subcategories', function(req,res) {

    var filtercats = req.query.categories;
    var filtersubcats = req.query.subcategories;


    var calls = [];
    calls.push(function(callback) {
        Recruiter.find({}, function(err,recruiters){
          callback(null, recruiters);
        });
    });
    calls.push(function(callback) {
        Job.find({}, function(err,jobs){
          callback(null, jobs);
        });
    });
    calls.push(function(callback) {
        var finalres = [];
        Publicidad.find({relevance:["Top"]}, function(er, p4) {
          if(p4)
            finalres = finalres.concat(p4);
          Publicidad.find({relevance:["Very very Relevant"]}, function(er, p3) {
            if(p3)
              finalres = finalres.concat(p3);
            Publicidad.find({relevance:["Very Relevant"]}, function(er, p2) {
              if(p2)
                finalres = finalres.concat(p2);
              Publicidad.find({relevance:["Medium"]}, function(er, p1) {
                if(p1)
                  finalres = finalres.concat(p1);
                Publicidad.find({relevance:["Low"]}, function(er, p0) {
                    if(p0)
                      finalres = finalres.concat(p0);
                    callback(null, finalres);
                });    
              });
            });  
          }); 
        });
    });
    calls.push(function(callback) {
        Category.find({}, function(err,categories) {
          callback(null, categories);
        });
    });
    calls.push(function(callback) {
        Subcategory.find({}, function(err,subcategories) {
          callback(null, subcategories);
        });
    });
    calls.push(function(callback) {
        User.find({}, function(err,users) {
          callback(null, users);
        });
    });
    calls.push(function(callback) {
        City.find({}, function(err,cities) {
          callback(null, cities);
        });
    });
    calls.push(function(callback) {
        State.find({}, function(err,states) {
          callback(null, states);
        });
    });

    async.parallel(calls, function(err, result) {
        /* this code will run after all calls finished the job or
           when any of the calls passes an error */
        if (err)
            return console.log(err);
        var pd = 0;
        var vd = 0;
        var recruiterlist = result[0];
        var joblist = result[1];
        var publicitylist = result[2];
        var categorylist = result[3];
        var subcategorylist = result[4];
        var userslist = result[5];
        var citieslist = result[6];
        var stateslist = result[7];
        var sendresult = [];
        var g = 0;



        //return res.json(result);

        while(g<=joblist.length-1) {
            /* Filter attributes for results */

            var category_id = '';var subcategory_id = '';var recusr_name = '';var recusr_image = '';
            var citys = '';var states = '';var region_info = ''; var add = false;
            if (joblist[g].category) {
                var category_id = joblist[g].category.toString();
                if (filtercats.indexOf(category_id)!=-1) {
                    add = true;
                }
                console.log("c: "+category_id);
                //var cti = categorylist[categorylist.map(function(e) { return e['_id'].toString(); }).indexOf(String(tmp_id))];
                //category = cti.name;
            }
            if (joblist[g].subcategory) {
                var subcategory_id = joblist[g].subcategory.toString();
                if (filtercats.indexOf(subcategory_id)!=-1) {
                    add = true;              
                }
                console.log("s: "+subcategory_id);
                //var cti = subcategorylist[subcategorylist.map(function(e) { return e['_id'].toString(); }).indexOf(String(tmp_id))];
                //subcategory = cti.name;
            }
            if (joblist[g].representant && joblist[g].representant!=undefined) {
                //console.log(joblist[g].representant.toString());
                var re = joblist[g].representant.toString();
                if (re) {
                    var cti = recruiterlist[recruiterlist.map(function(e) { return e['user'].toString() }).indexOf(String(re))];
                    if(cti) {
                        recusr_name = (cti.name) ? cti.name : '';
                        recusr_image = (cti.profile_image) ? cti.profile_image : '';
                        //cti.address.city
                        //cti.address.state
                        if (cti.address.city) {
                            var cityi = citieslist[citieslist.map(function(e) { return e['_id'].toString() }).indexOf(String(cti.address.city))];
                            if (cityi)
                                citys = cityi['name'];
                        }
                        if (cti.address.state) {
                            var statei = stateslist[stateslist.map(function(e) { return e['_id'].toString() }).indexOf(String(cti.address.state))];
                            if (statei)
                                states = statei['name'];
                        }
                        //citieslist
                        if (citys!="" && states!="") {
                            region_info = citys+", "+states;
                        }else if (citys!="") {
                            region_info = citys;
                        }else {
                            region_info = states;
                        }
                    }
                }
            }

            // Inject publicity
            console.log("count");
            console.log(vd);
            console.log(vd%2);
            if (vd!=0 && (vd%2)==0) {
                console.log("Inject some publicity here...");
                console.log(pd);
                console.log(publicitylist[pd]);
                var obj = {
                'id':'add_'+publicitylist[pd]._id,
                'image':publicitylist[pd].banner_url,
                'name':'',
                'recruiter':'',
                'region_info':'',
                'date':'',
                'isanadd':true
                };
                sendresult.push(obj);
                pd++;
            }

            //if (recusr_name!='' && recusr_image!='') {
            var datetoshow = new Date(joblist[g].Created_date);
            var fomartDate = datetoshow.getDate() + "-" + (datetoshow.getMonth()+1) + "-" + datetoshow.getFullYear() + " " + datetoshow.getHours() + ":" + datetoshow.getMinutes();
            var obj = {
                'id':joblist[g]._id,
                'image':recusr_image,
                'name':String(joblist[g].title),
                'recruiter':String(recusr_name),
                'region_info':String(region_info),
                'date':fomartDate,
                'isanadd':false
            };
            if(add==true){
                sendresult.push(obj);
                vd++;
            }
           // }
            g++;
        }
        return res.json(sendresult);
    });
});

app.post('/update_texts', function(req,res) {

    ContentTextArea.remove({},function(err, removed){

        //console.log('update texts method!');
        var arrayvalues = req.body.values;
        var i = 1;
        while (i < 264) {
            var s = 'title'+i;
            //console.log('INSIDE LOOP');
            //console.log(arrayvalues[s]);
            var new_ContentTextArea = new ContentTextArea({'name':s,'text':arrayvalues[s]});
            new_ContentTextArea.save(function(err, ContentTextArea) { });
            i++;
        }
        res.json({'status':1, 'message':'success'});




    });
});


app.get('/get_user_folders', function(req,res){
    var email = req.query.email;
    Folder.find({user:email}, function(error, respuesta) {
        if (error) {
          res.end();
        }
        res.json({'status':1, 'message':respuesta});
    });
});

app.get('/get_vid_id_by_url', function(req,res){
    var url = req.query.url;
    var arr = url.split("/");
    var l = url.split("/").length-1;
    url = arr[l];
    Video.find({url:url}, function(error, respuesta) {
        if (error) {
          res.end();
        }
        res.json({'status':1, 'message':respuesta});
    });
});

app.post('/update_video_add_to_folder', function(req,res){
    var folder_id = req.body.folder_id;
    var video_id = req.body.video_id;
    //console.log("folder");
    //console.log(folder_id);
    //console.log("video");
    //console.log(video_id);
    Folder.findOne({_id:folder_id}, function(error, f) {
        if (error) {
          res.end();
        }
        //console.log("f");
        //console.log(f);
        f.videos.push(video_id);
        f.save();
        res.json({status:1,message:'success'});
    });
});

app.get('/get_folder_vids', function(req,res) {
    Folder.findOne({_id: req.query.folder_id}, function(error, fold) {
        if (error) {
          //console.log(error);
          res.json({'status':0, 'message':'Error loading videos.'});
        }
        res.json({'status':1, 'message':fold.videos});
    });
});

app.get('/get_texts_all', function(req,res) {
    ContentTextArea.find({}, function(errors, result) {
      if (errors) {
        //console.log(errors);
      }
      res.json({'status':1,'message':result});
    });
});


app.post('/changeUserPasswordTwo', function(req,res){

    User.findOne({email:req.body.usr}, function (err1, u){
      bcrypt.compare(req.body.p, u.password, function(err2, respuesta) {
          if (err2) {res.json({'status':0,'message':'wrong password'})}
            console.log("!!!!!!!!!!!!!!!!!!!!! enter with userr !!!!!!!!!!!!!!!!11111");
          console.log(u);
          console.log(respuesta);
          if (respuesta==true) {
                if (u) {
                  bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(req.body.pass, salt, function(err3, hash) {
                    console.log("hash created")
                    console.log(hash);
                      u.password=hash;
                      u.save(function(errl, s) {
                          if (errl)
                            res.json(errl);
                          res.json(s);
                      });
                  });
                });
                } else {
                      res.json({'status':0,'message':'wrong password'});
                  }
            }else {
                res.json({'status':0,'message':'wrong password'});
            }
      });
    });
});

app.post('/changeUserPassword', function(req,res){

    User.findOne({email:req.body.usr}, function (err, u){
      bcrypt.compare(req.body.p, u.password, function(err, respuesta) {
          if (err) {res.json({'status':0,'message':'wrong password'})}
          if (u) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(req.body.pass, salt, function(err, hash) {
                  u['password']=req.body.hash;
                  u.save();
              });
            });
          } 
      });
    });
});

app.post('/addConnectionWeb', function(req,res){

  var conex = new Connection({
      leftside_user: req.body.left,
      rightside_user: req.body.right
  });
  conex.save(function(err, as) {
    if (err){
      res.json({status: 0});
    }
    res.json({status: 1});
  });
});

app.get('/changeUserPassword', function(req,res) {
  res.json({'status':1,'message':{'img_path':'https://www.lindsaycars.com/inventoryphotos/4497/1gnerkkw1kj114795/ip/1.jpg'}});
});

app.get('/delConnections',function(req,res) {
    var ConnectionId = req.query.id;
    var deletor = req.query.deletor;
    User.findOne({email:deletor}, function(er1, u){
        //console.log(u);
        Talent.findOne({_id:req.query.id}, function(er2, t) {
            Connection.findOne({leftside_user:u._id,rightside_user:t.user}, function(err5,con1){
                Connection.remove({
                  _id: con1._id
                }, function(err, Connection) {
                  if (err)
                    res.send(err);
                  res.json({ message: 'Task successfully deleted' });
                });
            });
            Connection.findOne({leftside_user:t.user,rightside_user:u._id}, function(err6,con2){
                Connection.remove({
                  _id: con2._id
                }, function(err, Connection) {
                  if (err)
                    res.send(err);
                  res.json({ message: 'Task successfully deleted' });
                });
            });
        });
        Recruiter.findOne({_id:req.query.id}, function(er3, r) {
            Connection.findOne({leftside_user:u._id,rightside_user:r.user}, function(err7,con3){
                Connection.remove({
                  _id: con3._id
                }, function(err, Connection) {
                  if (err)
                    res.send(err);
                  res.json({ message: 'Task successfully deleted' });
                });
            });
            Connection.findOne({leftside_user:r.user,rightside_user:u._id}, function(err8,con4){
                Connection.remove({
                  _id: con4._id
                }, function(err, Connection) {
                  if (err)
                    res.send(err);
                  res.json({ message: 'Task successfully deleted' });
                });
            });
        });
    });
    //console.log("id eliminado: "+ConnectionId);
    /*Connection.remove({
        _id: ConnectionId
      }, function(err, Connection) {
        if (err)
          res.send(err);
        res.json({ message: 'Task successfully deleted' });
      });*/
});

// Extra web routes needed for dev

app.get('/get_status_if_connected', function(req, res) {
  var luser = req.query.user_one;
  var ruser = req.query.user_two;
    Connection.find().and([{$or: [{leftside_user: luser, rightside_user: ruser}, 
        {rightside_user: luser, leftside_user: ruser}]}]).exec(function(err2, connections) {
          if (connections) {
            res.json({
              'status':1, 
              'message':connections[0]
            });
          }
    });
});



// route middleware to verify a token
app.use(function(req, res, next) {

  //console.log(req.body);

  // check header or url parameters or post parameters for token
  let token = '-1';//req.body.token || req.query.token || req.headers['x-access-token'];


    if(req.query.token && req.query.token !== "") {
        token = req.query.token;
    } else if(req.body.token && req.body.token !== "") {
        token = req.body.token;
    } else if(req.headers['x-access-token'] && req.headers['x-access-token'] !== "") {
        token = req.headers['x-access-token'];
    } else if(req.params.token && req.params.token !== "") {
        token = req.params.token;
    } else if(token==='-1') {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }

    console.log("Chk token!");
    console.log(token);

  //console.log('token send ----------------- */');
  //console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('alexAplicationKey'), function(err, decoded) {      
      if (err) {
        //console.log(err);
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });


  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});
















/* -- Private Routes after Middleware --*/


// route to show a random message (GET http://localhost:8080/api/)
app.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});
var routes = require('./api/routes/countryRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/stateRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/cityRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/categoryRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/subcategoryRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/contentImageRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/contentPageRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/contentTextAreaRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/contentTitleRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/departmentRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/educationTypeRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/enterpriseRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/idiomaRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/institutionRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/interestRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/levelRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/positionRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/sectorRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/savedSearchRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/socialMediaRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/talentRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/recruiterTypeRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/recruiterRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/achivementRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/awardRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/educationRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/laborumExperticeRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/recruiterFavouritesRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/videoRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/videoCatalogRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/talentFavouriteRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/jobRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/aplicationRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/jobTypeRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/publicidadRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/addressRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/connectionRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/folderRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/HTMLGraphicElementRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/paginaRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/notificationRoutes'); //importing route
routes(app); //register the route
var routes = require('./api/routes/hiddenRoutes'); //importing route
routes(app); //register the route

// Custom methods 




// End custom methods




app.listen(port);


process.on('uncaughtException', function(err) {
console.log(err);
});


console.log('todo list RESTful API server started on: ' + port);

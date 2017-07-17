var express = require('express');
var router = express.Router();

var Cate = require('../model/Cate.js');

var User = require('../model/User.js');

var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

/* GET home page. */
router.get('/', checkAdmin, function(req, res, next) {
  res.render('admin/main/index');
});

router.get('/dang-nhap.html', function(req, res, next) {
  res.render('admin/login/index');
});




router.post('/dang-nhap.html',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/admin/dang-nhap.html',
                                   failureFlash: true })
);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

  function(username, password, done) {
      User.findOne({email: username}, function(err, username){
          if(err) throw err;
          if(username){
            bcrypt.compare(password, username.password, function(err, user) {
                if(err) throw err;
                if(user){
                     return done(null, username);
                }else{
                   return done(null, false, { message: 'Tài Khoảng Không Đúng' });
                }
            });
          }else{
             return done(null, false, { message: 'Tài Khoảng Không Đúng' });
          }
      });
  }

));

passport.serializeUser(function(email, done) {
  
  done(null, email.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, email) {
    done(err, email);
  });
});



router.post('/getUser',checkAdmin, function (req, res) {
    res.json(req.user);
});

router.get('/dang-xuat.html',checkAdmin, function (req, res) {
    req.logout();
    res.redirect('/admin/dang-nhap.html');
});


function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap.html');
    }
}

module.exports = router;
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage: storage });



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

var Cate = require('../model/Cate.js');
var Product = require('../model/Product.js');

/* GET home page. */
router.get('/', checkAdmin, function (req, res) {
	res.redirect('/admin/product/danh-sach.html')
});

router.get('/danh-sach.html', checkAdmin, function (req, res) {
	
	Product.find().then(function(pro){
		res.render('admin/product/danhsach', {product: pro});
	});
});

router.get('/them-product.html', checkAdmin, function (req, res) {
	Cate.find().then(function(cate){
		res.render('admin/product/them',{errors: null, cate: cate});
	});
});


router.post('/them-product.html', checkAdmin, upload.single('hinh'), function (req, res) {
	req.checkBody('name', 'Tên không được rổng').notEmpty();
	//req.checkBody('hinh', 'Hình không được rổng').notEmpty();
	req.checkBody('gia', 'giá phải là số').isInt();
	req.checkBody('des', 'Chi tiết không được rổng').notEmpty();
	console.log(req.file);
    var errors = req.validationErrors();
	if (errors) {
		var file = './public/upload/' + req.file.filename;
		  var fs = require('fs');
			fs.unlink(file, function(e){
				if(e) throw e;
			});
  		Cate.find().then(function(cate){
			res.render('admin/product/them',{errors: errors, cate: cate});
		});
	}else{
		var pro = new Product({
			name 			: req.body.name,
			nameKhongDau 	: bodauTiengViet(req.body.name),
			img 			: req.file.filename,
			cateId 			: req.body.cate,
			des 			: req.body.des,
			price 			: req.body.gia,
			st 				: 0
		});

		pro.save().then(function(){
			req.flash('success_msg', 'Đã Thêm Thành Công');
			res.redirect('/admin/product/them-product.html'); 
		});
	}
});

router.get('/:id/sua-product.html', function (req, res) {
	Product.findById(req.params.id).then(function(data){
		Cate.find().then(function(cate){
			res.render('admin/product/sua',{errors: null, cate: cate, product: data});
		});
	});
	
});

router.post('/:id/sua-product.html',  upload.single('hinh'), function (req, res) {
	req.checkBody('name', 'Tên không được rổng').notEmpty();
	//req.checkBody('hinh', 'Hình không được rổng').notEmpty();
	req.checkBody('gia', 'giá phải là số').isInt();
	req.checkBody('des', 'Chi tiết không được rổng').notEmpty();

    var errors = req.validationErrors();
	if (errors) {
		
		var file = './public/upload/' + req.file.filename;
		var fs = require('fs');
		fs.unlink(file, function(e){
			if(e) throw e;
		 });

  		Product.findById(req.params.id).then(function(data){
			Cate.find().then(function(cate){
				res.render('admin/product/sua',{errors: errors, cate: cate, product: data});
			});
		});
	}else{
		Product.findOne({ _id: req.params.id},  function(err, data){
			var file = './public/upload/' + data.img;
			var fs = require('fs');
			fs.unlink(file, function(e){
				if(e) throw e;
			 });
			data.name 			= req.body.name;
			data.nameKhongDau 	= bodauTiengViet(req.body.name);
			data.img 			= req.file.filename;
			data.cateId 		= req.body.cate;
			data.des 			= req.body.des;
			data.price 			= req.body.gia;
			data.st 			= '0';

			data.save();
				req.flash('success_msg', 'Đã Sửa Thành Công');
				res.redirect('/admin/product/'+req.params.id+'/sua-product.html');
			//});


		});

	}
	
});

router.get('/:id/xoa-product.html', checkAdmin,  function (req, res) {
	// Product.findById(req.params.id).remove(function() {
	// 	console.log(daa);
	// 	req.flash('success_msg', 'Đã Xoá Thành Công');
	// 	res.redirect('/admin/product/danh-sach.html');
	// });

	Product.findById(req.params.id, function(err, data){
		var file = './public/upload/' + data.img;
		var fs = require('fs');
		fs.unlink(file, function(e){
			if(e) throw e;
		 });
		data.remove(function(){
			req.flash('success_msg', 'Đã Xoá Thành Công');
			res.redirect('/admin/product/danh-sach.html');
		})
	});
	
});

function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap.html');
    }
}

module.exports = router;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Product = new Schema({
  name 			:  String,
  nameKhongDau	: String,
  img 			: String,
  cateId 		: String,
  des 			: String,
  price 		: Number,
  st 			: Number


},{collection : 'product'});

module.exports = mongoose.model('Product', Product);
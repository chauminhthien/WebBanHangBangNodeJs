var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Cate = new Schema({
  name:  String,
  nameKhongDau: String

},{collection : 'cate'});

module.exports = mongoose.model('Cate', Cate);
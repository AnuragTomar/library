var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  isbn: {type: String, required: true},
  genre: [{type: Schema.ObjectId, ref: 'Genre'}],
  published_date: {type : Date},
  total_pages : {type: Number},
  angie_meter : {type: Number}
});

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

BookSchema
.virtual('published_date')
.get(function () {
  return moment(this.published_date).format('MMMM Do, YYYY');
});
//Export model
module.exports = mongoose.model('Book', BookSchema);



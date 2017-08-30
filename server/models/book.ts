import * as mongoose from 'mongoose';

const comment = new mongooose.Schema({
	uname       : {type: mongoose.Schema.ObjectId, ref='User'},
	fav_part    : String,
	descriptopn : String,
	comment_date: {type:Date, default:Date.now}
});  

const bookSchema = new mongoose.Schema({
	name		: {type:String, required: true},
	discription : String,
	author  	: [{type:mongoose.Schema.ObjectId, ref:'Author', required: true}],
	genre		: [String],
	comments	: [comment]
});


const Book = mongoose.model('Book',bookSchema);

export default Book;

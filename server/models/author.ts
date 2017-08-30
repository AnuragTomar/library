import * as mongoose from 'mongoose';

const author= new mongoose.Schema({
	name		: String,
	bestseller  : [{type:mongoose.Schema.ObjectId, ref:'Book'}],
	about		: String
});

const Author= mongoose.model('Author',author);

export default Author;
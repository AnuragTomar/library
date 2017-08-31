import * as mongoose from 'mongoose';

const authorSchema= new mongoose.Schema({
	name		: String,
	bestseller  : [{type:mongoose.Schema.ObjectId, ref:'Book'}],
	about		: String
});

const Author= mongoose.model('Author',authorSchema);

export default Author;
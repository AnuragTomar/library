import * as mongoose from 'mongoose';

const author= new mongoose.Schema({
	name: String,
	bestseller:String,
	about:String
});

const Author= mongoose.model('Author',author);

export default Auhtor;
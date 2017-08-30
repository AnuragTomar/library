import * as mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	name	: {type:String, required: true},
	author  : [{type:mongoose.Schema.ObjectId, ref:'Author', required: true}],
	genre	: [String],
	comment : [{type:mongoose.Schema.ObjectId, ref:'Comment'}]
});

const Book = mongoose.model('Book',bookSchema);

export default Book;

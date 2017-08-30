import * as mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	name		: {type:String, required: true},
	discription : String,
	author  	: [{type:mongoose.Schema.ObjectId, ref:'Author', required: true}],
	genre		: [String],
	comment		: [{type:mongoose.Schema.ObjectId, ref:'Comment'}]
});

/*	comment		: [{type:mongoose.Schema.ObjectId, ref:'Comment'}]
this statement means we will assign id of some comment object to our comment attribute, when we use populate method this id is replaced with document path of comment*/

const Book = mongoose.model('Book',bookSchema);

export default Book;

import Book from '../models/book';
import BaseCtrl from './base';

export default class BookCtrl extends BaseCtrl{
	model = Book;
 get = (req,res) => {
		Book.findOne({ _id:req.params.id},(err,obj) => {
			if(err){
				return console.error(err);
			}
			res.json(obj);
		});
	}
}

/*
get(req,res){
Book.findOne({ _id:req.params.id},function(err,obj){if(err){return console.error(err);}res.json(obj);});
}
*/
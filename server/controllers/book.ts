import Book from '../models/book';
import BaseCtrl from './base';

export default class BookCtrl extends BaseCtrl{
	model = Book;
 get = (req,res) => {
		Book.findOne({_id:req.params.id}).populate('author')
		.populate('comment')
		.populate('comment.user')
		.exec((err,obj) => {
			if(err){
					return console.error(err);
			}
			res.json(obj)
		});
	}
}
/* this means compare _id of book document with the id given by user in req.params.id, then using reference provideed in model for author populate author data.*/
/*
get(req,res){
Book.findOne({ _id:req.params.id},function(err,obj){if(err){return console.error(err);}res.json(obj);});
}
*/
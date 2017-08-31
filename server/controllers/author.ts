import Author from '../models/author';
import BaseCtrl from './base';

export default class AuthorCtrl extends BaseCtrl{
	model = Author;
/*	get = (req,res) => {
		Author.findOne({_id:req.params.id}).populate('bestseller').exec((err, obj) => {
			if(err){
				return console.error(err);
			}
			res.json(obj);
		});
	}*/
}
import Comment from '../models/comment';
import BaseCtrl from './base';

export default class CommentCtrl extends BaseCtrl{
	model = Comment; 
	get = (req,res) => {
		Comment.findOne({_id:req.params.id},(err,obj) => {
			if(err){
				return console.error(err);
			}
			res.json(obj);
		});
	}
}
import Comment from '../models/comment';
import BaseCtrl from './base';

export default class CommentCtrl extends BaseCtrl{
	model = Comment;
 /*get = (req,res) => {
		Comment.findOne({}).populate('user')
		.exec((err,obj) => {
			if(err){
					return console.error(err);
			}
			res.json(obj)
		});
	}*/
}

import * as  mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	fav_part	  : {type:String},
	description	  : {type: String, required:true},
	user		  : {type:mongoose.Schema.ObjectId, ref:'User', required: true},
	comment_date  : {type:Date, default: Date.now}
});

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;
var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var CommentSchema = new Schema({
//	username:{type:Schema.OjectId, ref:'User', required: true},
	user_name:{type:Schema.ObjectId, ref:'User', required: true},
	book:{type:Schema.ObjectId, ref:'Book' , required :true},
	page_number: {type:Number , required : true },
	fav_part:[{type: String}],
	description:{type : String},
	published_date:{type: Date, default:Date.now}
});

module.exports=mongoose.model('Comment',CommentSchema);


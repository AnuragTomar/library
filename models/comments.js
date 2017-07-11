var mongoose= require('mongoose');

var CommentSchema = new mongoose.Schema({
	name : {type:String ,required: true},
	book : {type:Schema.ObjectId, ref:'Book' , required :true),
	page_number: {type:Number , required : true },
	fav_part:{type: String, requried: true},
	description:{type : String},
	published_date:{type: Date, default:Date.now}
});

module.exports=mongoose.model('Comment',CommentSchema);


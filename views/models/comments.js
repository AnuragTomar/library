var mongoose= require('mongoose');

var Comments = new mongoose.Schema({
	name : {type:String ,required: true},
	book : {type:String , required :true),
	page_number: {type:Number , required : true },
	fav_part:{type: String, requried: true},
	description:{type : String},
	date_published:{type: Date},
});



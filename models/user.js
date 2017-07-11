var mongoose = require('mongoose');

var Schema=mongoose.Schema;

var UserSchema= new Schema({
	firstname:{type:String, required:true},
	lastname:{type:String, required:true},
	user_name:{type:String, required:true},
	password:{type: String , required:true},
	email:{type:String, required: true},
	preferred_genres:[{type:ObjectId, ref:'Genre'}],
	fav_authors:[{type:ObjectId, ref:'Author'}],
	fav_books:[{type:ObjectId, ref:'Book'}]
});
UserSchema
.virtual('id')
.get(function(){
return 'catalog/user/' this.id;
});

UserSchema
.virtual('name')
.get(function(){
return this.firstname +" " +this.lastname;

module.exports=mongoose.model('User',UserSchema);

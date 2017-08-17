import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';


const userSchema= new mongoose.Schema({
	username: String,
	password: String,
	email   : {type: String, unique : true, lowercase: true, trim: true },
	role    : String
});
userSchema.pre('save', function(next){
	const user=this;
		if(!user.isModified('password'))
		{
		return next();
		}
	bcrypt.genSalt(10,function(err,salt){

const User = mongoose.model('User', userSchema);

export default User;

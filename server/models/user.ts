import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  //isModified is mongoose function to check if document is changed from previous value. 


  /*10 stands for 10 rounds and function is callback in genSalt().function returns err if there is error or generated salt in salt var.
  bcrypt.hash function takes data, salt and return a hash or error from a callback function.*/
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});


/* candidatepassword is the password sent by user,this.password contains the hashed password stored in dbase[as user is identified while calling comparepassword from controller hence "this" is used.] callback is the function whose definition is written at caller function and which is passed as variable to comparePassword function. so if there is error callback function gets err in response else (null,isMatch) because when u send only err as parameter it is assigned to first argument in callback function which takes err as argument but when you send isMatch value it is also assigned to err in callback so we send(null,isMatch) where null assigned to err and isMatch is assigned to isMatch in callback function*/
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user, delete the password field in response sent to user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;

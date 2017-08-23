import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number
});

const Cat = mongoose.model('Cat', catSchema);
//converts catSchema schema to Cat mongoose model.

export default Cat;

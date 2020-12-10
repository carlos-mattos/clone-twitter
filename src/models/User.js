const mongoose = require('mongoose');


//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  bio: { type: String, required: true },
  user: { type: String, required: true },
  location: { type: Object, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Post' }],
  followers: [this],
  following: [this],
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile_pic: { type: String, required: false },
  birth_date: { type: Date, required: true },
})

//Model
const User = mongoose.model('User', userSchema);

module.exports = User;
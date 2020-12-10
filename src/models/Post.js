const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const postSchema = new Schema({
  content: { type: String, required: true },
  user: { type: String, required: true },
  create_date: { type: Date, required: true },
  visible: { type: Boolean, default: true },
  likes: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
  replies: [this]
})

//Model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
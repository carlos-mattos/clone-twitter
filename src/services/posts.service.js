const Post = require('../models/Post.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');


const create = async (data, user) => {
  if (!data.content) throw new Error('Does not exist any content');
  const newPost = new Post(data);
  const solvingPromise = await newPost.save();
  const postedByUser = await User.findOneAndUpdate({ user }, { $push: { posts: solvingPromise._id } })
  return { ...solvingPromise, user: postedByUser };
}

const like = (idPost, idUser) => {
  return Post.findByIdAndUpdate(idPost, { $push: { likes: idUser } });
}

const reply = async (id, data) => {
  const postReply = await Post.create(data);
  const { _id } = postReply;
  return await Post.findByIdAndUpdate(id, { $push: { replies: _id } });
}

const getReplies = (id) => {
  return Post.findById(id).populate('replies').select('replies')
}

const getFeed = async (id) => {

  const handleFeed = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'following',
        foreignField: '_id',
        as: 'following'
      }
    },
    { $unwind: '$following' },
    { $replaceRoot: { newRoot: '$following' } },
    {
      $lookup: {
        from: 'posts',
        localField: 'posts',
        foreignField: '_id',
        as: 'posts'
      }
    },
    { $project: { age: 0, bio: 0, email: 0, password: 0, followers: 0 } },
    { $unwind: '$posts' },
    { $replaceRoot: { newRoot: { $mergeObjects: ["$posts", "$$ROOT"] } } },
    { $project: { posts: 0 } }
  ]);
  console.log(handleFeed)
  return handleFeed
}

module.exports = {
  create,
  like,
  reply,
  getReplies,
  getFeed
}
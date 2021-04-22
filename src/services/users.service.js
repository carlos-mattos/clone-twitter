const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const create = async (data) => {
  const { password } = data;
  const ecryptedPassword = bcrypt.hashSync(password, 2);
  return await User.create({ ...data, password: ecryptedPassword });
};

const profile = async (user) => {
  return await User.aggregate([
    { $match: { user } },
    {
      $lookup: {
        from: 'posts',
        localField: 'posts',
        foreignField: '_id',
        as: 'posts',
      },
    },
    { $unwind: '$posts' },
    {
      $project: {
        posts: 1,
        name: 1,
        profile_pic: 1,
        post: '$posts',
        likes: { $size: '$posts.likes' },
      },
    },
    { $project: { posts: 0 } },
  ]);
};

const follow = async (id, idUser) => {
  await User.findByIdAndUpdate(id, { $push: { followers: idUser } });
  return await User.findByIdAndUpdate(idUser, { $push: { following: id } });
};

module.exports = {
  create,
  profile,
  follow,
};

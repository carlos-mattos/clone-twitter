const Post = require('../models/Post.js');
const User = require('../models/User.js');
const PostsService = require('../services/posts.service.js')

const postsController = async (req, res) => {
  try {
    const { body } = req;
    const { user } = body;
    const response = await PostsService.create(body, user);
    res.send(response);

  } catch (error) {
    res.status(404).send({ error: true, error: error.message })
  }
}

const showingData = async (req, res) => {
  try {
    Post.find({}).then((data) => {
      res.json(data);
    })
  } catch (error) {
    res.status(404).send({ error: true, error: error.message })
  }
}

const like = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: idUser } = req.decoded;
    const response = await PostsService.like(id, idUser);
    res.send(response);

  } catch (error) {
    res.status(404).send({ error: true, error: error.message })
  }
}

const reply = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await PostsService.reply(id, body);
    res.send(response);

  } catch (error) {
    res.status(404).send({ error: true, error: error.message })
  }
}

const getReplies = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const response = await PostsService.getReplies(id, body);
    res.send(response)

  } catch (error) {
    res.status(404).send({ error: true, error: error.message })
  }
}

const getFeed = async (req, res) => {
  try {
    const { id: idUser } = req.decoded;

    const response = await PostsService.getFeed(idUser);
    res.send(response);
  } catch (error) {
    res.status(404).send({ error: true, error: error.message })
  }
}

module.exports = {
  postsController,
  showingData,
  like,
  reply,
  getReplies,
  getFeed
}
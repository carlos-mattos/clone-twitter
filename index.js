const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { postsController, showingData, like, reply, getReplies, getFeed } = require('./src/controllers/posts.controller.js');
const { UserController, showingUsers, profile, login, follow } = require('./src/controllers/users.controller.js');
const AuthMiddleware = require('./src/middlewares/auth-middleware.js')


const app = express();
app.use(express.json())
app.use(AuthMiddleware)

const { HTTP_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI || 'mongodb://localhost/clone-twitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected")
})

app.get('/showPosts', showingData);
app.get('/showUsers', showingUsers);
app.get('/profile/:user', profile);
app.get('/posts/:id/replies', getReplies);
app.get('/posts/feed', getFeed);

app.post('/posts', postsController);
app.post('/users', UserController);
app.post('/login', login);
app.post('/posts/:id/like', like);
app.post('/posts/:id/reply', reply);
app.post('/users/:id/follow', follow);

app.listen(HTTP_PORT, () => {
  console.log(`Api-Started / port: ${HTTP_PORT}!!!`)
})

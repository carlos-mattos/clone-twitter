const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const UserService = require('../services/users.service.js');
const express = require('express');
require('dotenv').config();

const createToken = (payload) => {
  const { JWT_SECRET } = process.env;
  return jwt.sign(
    {
      iat: moment().unix(),
      exp: moment().add(1, 'day').unix(),
      id: payload._id,
    },
    JWT_SECRET
  );
};

const UserController = async (req, res) => {
  try {
    const { body } = req;
    const created = await UserService.create(body);
    res.send(created);
  } catch (error) {
    res.status(500).send({ error: 'was nos possible to creat User' });
  }
};

const showingUsers = async (req, res) => {
  try {
    User.find({}).then((data) => {
      res.json(data);
    });
  } catch (error) {
    res.status(404).send({ error: 'Not possible to show Users' });
  }
};

const profile = async (req, res) => {
  try {
    const { user } = req.params;
    const profile = await UserService.profile(user);
    res.send(profile);
  } catch (error) {
    res.status(404).send({ error: 'Not possible to show User' });
  }
};

const login = async (req, res) => {
  const { body } = req;
  const user = await User.findOne({ email: body.email });

  if (!user) {
    res.send({ error: true, message: 'email does not exist' });
  }
  if (bcrypt.compareSync(body.password, user.password)) {
    res.send({ token: createToken(user) });
  } else {
    res.send({ error: 'incorrect password' });
  }
};

const follow = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: idUser } = req.decoded;
    const response = await UserService.follow(id, idUser);

    res.send(response);
  } catch (error) {
    res.status(404).send({ error: true, message: error.message });
  }
};

module.exports = {
  UserController,
  showingUsers,
  profile,
  login,
  follow,
};

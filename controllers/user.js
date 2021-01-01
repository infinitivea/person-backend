const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const register = async (req, res, next) => {
  try {
    const { email, password, phone, image_url, role } = req.body;
    const targetUser = await db.User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (targetUser) {
      res.status(400).send({ message: 'Email or phone number has already used.' });
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcrypt.hashSync(password, salt);

      await db.User.create({
        email,
        password: hashedPassword,
        phone,
        image_url,
        role,
      });
    }
    res.status(201).send({ message: 'User has created.' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const targetUser = await db.User.findOne({ where: { email } });

  if (targetUser) {
    if (bcrypt.compareSync(password, targetUser.password)) {
      const token = jwt.sign({ id: targetUser.id, role: targetUser.role }, process.env.SECRET, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Username or password is incorrect.' });
    }
  } else {
    res.status(400).send({ message: 'Username or password is incorrect.' });
  }
};

const getAllUser = async (req, res) => {
  const allUser = await db.User.findAll();
  res.status(200).send(allUser);
};

const getUserData = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (id) {
      const userData = await db.User.findOne({ where: { id } });
      return res.status(200).send(userData);
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  getUserData,
};

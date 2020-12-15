const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    const targetUserByEmail = await db.User.findOne({ where: { email } });
    const targetUserByPhone = await db.User.findOne({ where: { phone } });

    if (targetUserByEmail || targetUserByPhone) {
      res.status(400).send({ message: 'Email or phone number has already used.' });
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcrypt.hashSync(password, salt);

      await db.User.create({
        email,
        password: hashedPassword,
        name,
        phone,
      });
    }
    res.status(201).send({ message: 'User created.' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const targetUser = await db.User.findOne({ where: { email } });

  if (targetUser) {
    if (bcrypt.compareSync(password, targetUser.password)) {
      const token = jwt.sign({ id: targetUser.id }, process.env.SECRET, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Username or password is incorrect.' });
    }
  } else {
    res.status(400).send({ message: 'Username or password is incorrect.' });
  }
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
  getUserData,
};

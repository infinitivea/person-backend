const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const targetAdmin = await db.Admin.findOne({ where: { username } });

    if (targetAdmin) {
      res.status(400).send({ message: 'Username has already used.' });
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcrypt.hashSync(password, salt);

      await db.Admin.create({
        username,
        password: hashedPassword,
      });
    }
    res.status(201).send({ message: 'Admin has created.' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetAdmin = await db.Admin.findOne({ where: { username } });

  if (targetAdmin) {
    if (bcrypt.compareSync(password, targetAdmin.password)) {
      const token = jwt.sign({ id: targetAdmin.id, role: 'ADMIN' }, process.env.SECRET, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Username or password is incorrect.' });
    }
  } else {
    res.status(400).send({ message: 'Username or password is incorrect.' });
  }
};

module.exports = {
  register,
  login,
};

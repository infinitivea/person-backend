const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const register = async (req, res, next) => {
  try {
    const { email, password, company_name, company_type, phone, closeDate, openTime, closeTime } = req.body;
    const targetPartnerByEmail = await db.Partner.findOne({ where: { email } });
    const targetPartnerByPhone = await db.Partner.findOne({ where: { phone } });

    if (targetPartnerByEmail && targetPartnerByPhone) {
      res.status(400).send({ message: 'Email or phone number has already used.' });
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcrypt.hashSync(password, salt);

      await db.Partner.create({
        email,
        password: hashedPassword,
        company_name,
        company_type,
        phone,
        closeDate,
        openTime,
        closeTime,
      });
    }
    res.status(201).send({ message: 'Partner has created.' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const targetPartner = await db.Partner.findOne({ where: { email } });

  if (targetPartner) {
    if (bcrypt.compareSync(password, targetPartner.password)) {
      const token = jwt.sign({ id: targetPartner.id, role: 'PARTNER' }, process.env.SECRET, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Username or password is incorrect.' });
    }
  } else {
    res.status(400).send({ message: 'Username or password is incorrect.' });
  }
};

const getAllPartner = async (req, res) => {
  const allPartner = await db.Partner.findAll();
  res.status(200).send(allPartner);
};

const getPartnerData = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (id) {
      const partnerData = await db.Partner.findOne({ where: { id } });
      return res.status(200).send(partnerData);
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
  } catch (err) {
    next(err);
  }
};

const updateInformation = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { company_name, company_type, closeDate, openTime, closeTime } = req.body;
    const file = req.file;

    cloudinary.uploader.upload(file.path, async (error, result) => {
      console.log(result);
      console.log('------------');
      console.log(error);

      const targetPartner = await db.Partner.findOne({ where: { id } });

      if (targetPartner) {
        targetPartner.company_name = company_name;
        targetPartner.company_type = company_type;
        targetPartner.image = result.secure_url;
        targetPartner.closeDate = closeDate;
        targetPartner.openTime = openTime;
        targetPartner.closeTime = closeTime;

        await targetPartner.save();

        fs.unlinkSync(file.path);
        res.status(201).json(targetPartner);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getAllPartner,
  getPartnerData,
  updateInformation,
};

const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createBooking = async (req, res, next) => {
  try {
    const { reserve_date, type, email, phone } = req.body;

    await db.Booking.create({
      reserve_date,
      type,
      email,
      image,
      phone,
    });

    res.status(201).send({ message: 'Booking Success.' });
  } catch (err) {
    next(err);
  }
};

const geBookingData = async (req, res, next) => {
  try {
    const { id } = req.query;
    const targetBooking = await db.Booking.findAll({ where: { id } });

    if (targetBooking) {
      return res.status(200).send(targetBooking);
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  geBookingData,
};

const db = require('../models');

const createBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company_name, reserve_date, type, email, phone, user_id } = req.body;

    await db.Booking.create({
      company_name,
      reserve_date,
      type,
      email,
      phone,
      user_id,
      partner_id: id,
    });

    res.status(201).send({ message: 'Booking Success.' });
  } catch (err) {
    next(err);
  }
};

const getBookingData = async (req, res, next) => {
  try {
    const { id } = req.query;
    const targetBooking = await db.Booking.findAll({ where: { partner_id: id } });

    if (targetBooking) {
      return res.status(200).send(targetBooking);
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
  } catch (err) {
    next(err);
  }
};

const approveBooking = async (req, res, next) => {
  try {
    const { booking_id, partner_id } = req.body;
    const targetBooking = await db.Booking.findOne({ where: { id: booking_id } });

    if (targetBooking) {
      targetBooking.status = 'Approve';
      await targetBooking.save();

      const targetPartner = await db.Partner.findOne({ where: { id: partner_id } });
      if (targetPartner) {
        targetPartner.status = 'Reserved';
        await targetPartner.save();
      }
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  getBookingData,
  approveBooking,
};

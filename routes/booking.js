const router = require('express').Router();
const { createBooking, getBookingData, approveBooking } = require('../controllers/booking');

const passport = require('passport');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/', auth, getBookingData);
router.post('/create/:id', auth, createBooking);
router.patch('/approve', auth, approveBooking);

module.exports = router;

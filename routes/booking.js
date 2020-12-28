const router = require('express').Router();
const { createBooking, getBookingData, approveBooking } = require('../controllers/booking');

router.post('/create/:id', createBooking);
router.get('/', getBookingData);
router.patch('/approve', approveBooking);

module.exports = router;

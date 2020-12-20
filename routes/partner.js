const router = require('express').Router();
const { login, register, getAllPartner, getPartnerData } = require('../controllers/partner');

router.post('/login', login);
router.post('/register', register);
router.get('/all', getAllPartner);
router.get('/', getPartnerData);

module.exports = router;

const router = require('express').Router();
const { upload } = require('../middleware/upload');
const { login, register, getAllPartner, getPartnerData, updateInformation } = require('../controllers/partner');

router.post('/login', login);
router.post('/register', register);
router.get('/all', getAllPartner);
router.get('/', getPartnerData);
router.post('/upload', upload.single('image'), updateInformation);

module.exports = router;

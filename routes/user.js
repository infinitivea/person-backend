const router = require('express').Router();
const { login, register, getAllUser, getUserData } = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);
router.get('/all', getAllUser);
router.get('/', getUserData);

module.exports = router;

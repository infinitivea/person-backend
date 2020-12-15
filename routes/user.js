const router = require('express').Router();
const { login, register, getUserData } = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);
router.get('/', getUserData);

module.exports = router;

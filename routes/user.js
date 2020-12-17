const router = require('express').Router();
const { login, register, getAllUser } = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);
router.get('/all', getAllUser);

module.exports = router;

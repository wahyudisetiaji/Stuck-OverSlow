var express = require('express');
var router = express.Router();
const {findUser,registerUser,loginUser} = require('../controllers/user-controller')

router.get('/', findUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;

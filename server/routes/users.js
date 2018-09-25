var express = require('express');
var router = express.Router();
const {findUser,registerUser,loginUser, googleSignIn} = require('../controllers/user-controller')

router.get('/', findUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/google', googleSignIn)

module.exports = router;

var express = require('express');
var router = express.Router();
var {isLogin} = require('../middlewares/isLogin')
const {
    getAllQuestions,
    getMyQuestions, 
    getOneQuestions,
    createQuestions,
    updateMyQuestions,
    upVote,
    downVote,
    upvoteAnswer,
    downvoteAnswer,
    addAnswer,
    updateAnswer,
    deleteMyQuestions
} = require('../controllers/questions-controller')

router.get('/', getAllQuestions)
router.get('/me', isLogin, getMyQuestions)
router.get('/question/:id', getOneQuestions)
router.post('/create', isLogin, createQuestions)
router.put('/update/:id', isLogin, updateMyQuestions)
router.put('/update/upvote/:id', isLogin, upVote)
router.put('/update/downvote/:id', isLogin, downVote)
router.put('/update/upvote/answer/:id', isLogin, upvoteAnswer)
router.put('/update/downvote/answer/:id', isLogin, downvoteAnswer)
router.put('/update/addanswer/:id', isLogin, addAnswer)
router.put('/update/updateanswer/:id', isLogin, updateAnswer)
router.delete('/delete/:id', isLogin, deleteMyQuestions)

module.exports = router
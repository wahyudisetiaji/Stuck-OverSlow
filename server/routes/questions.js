var express = require('express');
var router = express.Router();
var {isLogin} = require('../middlewares/isLogin')
var {isOwner} = require('../middlewares/isOwner')
var {isQuestions} = require('../middlewares/isQuestions')

const {
    getAllQuestions,
    getAllCategory,
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
router.get('/:category', getAllCategory)
router.get('/question/:id', getOneQuestions)
router.post('/create', isLogin, createQuestions)
router.put('/update/:id', isLogin, isOwner, updateMyQuestions)
router.put('/update/upvote/:id', isLogin, isOwner, upVote)
router.put('/update/downvote/:id', isLogin, isOwner, downVote)
router.put('/update/upvote/answer/:id', isLogin, isQuestions, upvoteAnswer)
router.put('/update/downvote/answer/:id', isLogin, isQuestions, downvoteAnswer)
router.put('/update/addanswer/:id', isLogin, addAnswer)
router.put('/update/updateanswer/:id', isLogin, isQuestions, updateAnswer)
router.delete('/delete/:id', isLogin, isOwner, deleteMyQuestions)

module.exports = router
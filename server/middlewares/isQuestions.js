const Questions = require('../models/questions')

module.exports = {

    isQuestions: function (req, res, next) {
        console.log('masuk ----')
        let id = req.params.id
        let user = req.user
        if(user){

            Questions.findOne({_id: id})
            .then((result) => {

                if (result._id.toLocaleString() == id.toLocaleString()) {
                    console.log('masuk')
                    req.questions = result
                    next()

                } 

            }).catch((err) => {

                res.status(400).json({
                    message: err.message
                })
                
            });
            
        }else{
            res.status(400).json({
                message: `Your not authorized !`
            })
        }

    }

} 
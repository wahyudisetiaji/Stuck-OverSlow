const Questions = require('../models/questions')

module.exports = {

    isOwner: function (req, res, next) {
        let id = req.params.id
        let user = req.user
        if(user){

            Questions.findOne({_id: id})
            .then((result) => {

                if (result.userId.toLocaleString() == req.user._id.toLocaleString()) {
                    
                    req.owner = user
                    req.questions = result
                    next()

                } else {
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
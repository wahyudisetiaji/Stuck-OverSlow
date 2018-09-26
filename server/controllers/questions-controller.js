const Questions = require('../models/questions')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    
    createQuestions: function (req, res) {
        let token = req.headers.token 
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        User.findOne({email: req.user.email})
        .then((result) => {

            if (result._id == decode.id) {

                Questions.create({
                    title: req.body.title,
                    questions: req.body.questions,
                    category: req.body.category,
                    userId: decode.id
                })
                .then((result) => {

                    res.status(200).json({
                        message: 'create questions success',
                        result
                    }) 

                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    });
                });

            } else {

                res.status(400).json({
                    message: `your not authorized !`
                });

            }
            
        })
        .catch((err) => {

            res.status(400).json({
                message: err.message
            });

        });
        
    },

    getMyQuestions: function (req, res) {

        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        User.findOne({email: req.user.email})
        .then((result) => {

            if (result._id == decode.id) {

                Questions.find({userId: decode.id})
                .then((result) => {

                    res.status(200).json({
                        message: 'my questions',
                        result
                    })

                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });

            } else {

                res.status(400).json({
                    message: `your not authorized !`
                });

            }
        })
        .catch((err) => {

            res.status(400).json({
                message: err.message
            })

        })
    },

    deleteMyQuestions: function (req, res) {

        let id = req.params.id
        if (req.owner) {

            Questions.deleteOne({_id: id})
            .then(() => {
                res.status(200).json({
                message: "questions successfully deleted"
                });
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });

        } else {

            res.status(400).json({
                message: `your not authorized !`
            });

        }
            

    },

    updateMyQuestions: function (req, res) {

        let id = req.params.id
        if (req.owner) {

            Questions.updateOne(
                { _id: id },
                {
                    $set: {
                    title: req.body.title,
                    questions: req.body.questions,
                    category: req.body.category,
                    }
                }
            )
            .then(() => {
                res.status(200).json({
                    message: "questions successfully updated"
                });
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                });
            });

        } else {

            res.status(400).json({
                message: `your not authorized !`
            });

        }
          
    },

    getOneQuestions: function (req, res) {

        let id = req.params.id 
        Questions.find({_id: id})
        .populate('userId')
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });

    },

    getAllQuestions: function (req, res) {

        let id = req.params.id 
        Questions.find({})
        .populate('userId')
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });

    },

    getAllCategory: function (req, res) {

        let category = req.params.category
        Questions.find({category: category})
        .populate('userId')
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });

    },

    upVote: function (req, res) {

        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        let owner = false
        if (req.owner) {

            owner = true
            res.status(200).json({
                message: 'Vote for yourself is prohibited !'
            })

        } 
        
        let status = false
        req.questions.upvote.forEach(element => {

            if(element.userId == decode.id) {
                status = true
            }

        })
        req.questions.downvote.forEach(element => {

            if(element.userId == decode.id) {
                status = true
            }

        })

        if (status == false && owner == false) {

            Questions.updateOne(
                {_id: id},
                {$push: {
                    upvote: {userId: decode.id}
                }}
            )
                .then((result) => {
                    res.status(200).json({
                        message: 'Successful up vote !'
                        })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });

        } else {

            res.status(200).json({
                message: 'Already vote !'
            })

        }  
        
    },

    downVote: function (req, res) {
       
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        let owner = false
        if (req.owner) {

            owner = true
            res.status(200).json({
                message: 'Vote for yourself is prohibited !'
            })

        } 
    
        let status = false
        req.questions.downvote.forEach(element => {

            if(element.userId == decode.id) {
                status = true
            }

        })
        req.questions.upvote.forEach(element => {

            if(element.userId == decode.id) {
                status = true
            }

        })

        if ( status == false && owner == false) {

            Questions.updateOne(
                {_id: id},
                {$push: {
                    downvote: {userId: decode.id}
                }}
            )
                .then((result) => {

                    res.status(200).json({
                        message: 'Successful down vote !'
                    })

                })
                .catch((err) => {

                    res.status(400).json({
                        message: err.message
                    })
                });

        } else {

            res.status(200).json({
                message: 'Already vote !'
            })

        }  
    },

    addAnswer: function (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        User.findOne({_id: req.user._id})
        .then((result) => {
            
            if (result._id.toLocaleString() == decode.id.toLocaleString()) {

                Questions.updateOne({_id: id},
                    {$push: {
                            answer: {
                                answer: req.body.answer,
                                username: decode.username,
                            }}
                    }
                )
                .then((result) => {
                    res.status(200).json({
                        message: 'Add answer successfully !'
                     })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });


            } else {

                res.status(400).json({
                    message: `your not authorized !`
                });

            }
            

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });
       
    },

    upvoteAnswer: function (req, res ) {
        let id = req.params.id 
        let token = req.headers.token
        let idAnswer = req.body.idAnswer
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        let user = false
        if (req.questions) {

            req.questions.answer.forEach(element => {

                if (element._id == idAnswer && element.username == decode.username) {
                    user = true
                    res.status(200).json({
                        message: 'Vote for yourself is prohibited !'
                    })
                }
                
            })

        } 

        let status = false
        let dataTmpAnswer
        req.questions.answer.forEach(element => {
            if(element._id == idAnswer) {
                dataTmpAnswer = element 
            }
        })

        dataTmpAnswer.upvote.forEach(element => {
            if(element.userId == decode.id) {
                status = true
            }
        })

        dataTmpAnswer.downvote.forEach(element => {
            if(element.userId == decode.id) {
                status = true
            }
        })

        dataTmpAnswer.upvote.push({userId: decode.id})

        let allAnswer = req.questions.answer
        allAnswer.forEach(element => {
            if(element._id == idAnswer) {
                element = dataTmpAnswer 
            }
            
        })

        if(status == false && user == false) {

            Questions.updateOne(
                {_id: id},
                {$set: {
                    answer: allAnswer
                }}
            )
                .then((result) => {
                    res.status(200).json({
                        message: 'Successful up vote !'
                        })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });

        } else {

            res.status(200).json({
                message: 'Already vote !'
            })

        } 
       
    },

    downvoteAnswer: function (req, res ) {
        let id = req.params.id 
        let token = req.headers.token
        let idAnswer = req.body.idAnswer 
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        let user = false
        if (req.questions) {

            req.questions.answer.forEach(element => {
                if (element._id == idAnswer && element.username == decode.username) {
                    user = true
                    res.status(200).json({
                        message: 'Vote for yourself is prohibited !'
                        })
                }
            })

        } 

        let status = false
        let dataTmpAnswer
        req.questions.answer.forEach(element => {
            if(element._id == idAnswer) {
                dataTmpAnswer = element 
            }
        })

        dataTmpAnswer.downvote.forEach(element => {
            if(element.userId == decode.id) {
                status = true
            }
        })

        dataTmpAnswer.upvote.forEach(element => {
            if(element.userId == decode.id) {
                status = true
            }
        })

        dataTmpAnswer.downvote.push({userId: decode.id})

        let allAnswer = req.questions.answer
        allAnswer.forEach(element => {
            if(element._id == idAnswer) {
                element = dataTmpAnswer 
            }
            
        })

        if(status == false && user == false) {
            Questions.updateOne(
                {_id: id},
                {$set: {
                    answer: allAnswer
                }}
            )
                .then((result) => {
                    res.status(200).json({
                        message: 'Successful down vote !'
                        })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
        } else {
            res.status(200).json({
                message: 'Already vote !'
            })
        } 
       
    },

    updateAnswer: function (req, res) {
        let id = req.params.id 
        let idAnswer = req.body.idAnswer 

        if (req.questions) {
            
            req.questions.answer.forEach(element => {
                if(element._id == idAnswer) {
                    element.answer = req.body.answer
                }
            })
            
            Questions.updateOne({_id: id},
                {$set: {
                    answer: req.questions.answer
                }}
            )
            .then((result) => {
                res.status(200).json({
                    message: 'Update answer succesfully!'
                })
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            });

        } else {

            res.status(400).json({
                message: `your not authorized !`
            });

        }

    }



}
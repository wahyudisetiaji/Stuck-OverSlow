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

        Questions.findOne({_id: id})
        .then((result) => {
            
            if (result.userId.toLocaleString() == req.user._id.toLocaleString()) {

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

        })
        .catch((err) => {

             res.status(400).json({
                message: err.message
            });

        });
    },

    updateMyQuestions: function (req, res) {
        let id = req.params.id

        Questions.findOne({_id: id})
        .then((result) => {
            
            if (result.userId.toLocaleString() == req.user._id.toLocaleString()) {

                Questions.updateOne(
                    { _id: id },
                    {
                        $set: {
                        title: req.body.title,
                        questions: req.body.questions,
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

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            });

        });
        
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

    upVote: function (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
         Questions.findOne({_id: id})
         .then((result) => {
             if(result.userId.toLocaleString() == req.user._id.toLocaleString()) {
                 res.status(200).json({
                    message: 'dilarang vote question sendiri!'
                 })
             }else{
                 let status = false
                 result.upvote.forEach(element => {
                     if(element.userId == decode.id) {
                         status = true
                     }
                 })
                 result.downvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })

                 if(status == false) {
                    Questions.updateOne(
                        {_id: id},
                        {$push: {
                            upvote: {userId: decode.id}
                        }}
                    )
                    .then((result) => {
                        res.status(200).json({
                            message: 'upvote berhasil!'
                         })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
                 }else{
                    res.status(200).json({
                        message: 'sudah nge-vote!'
                     })
                 }  
             }
         })
         .catch((err) => {
             res.status(400).json({
                 message: err.message
             })
         })
    },

    downVote: function (req, res) {
        let id = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

         Questions.findOne({_id: id})
         .then((result) => {
             if(result.userId.toLocaleString() == req.user._id.toLocaleString()) {
                 res.status(200).json({
                    message: 'dilarang vote question sendiri!'
                 })
             }else{
                 let status = false
                 result.downvote.forEach(element => {
                     if(element.userId == decode.id) {
                         status = true
                     }
                 })
                 result.upvote.forEach(element => {
                    if(element.userId == decode.id) {
                        status = true
                    }
                })

                 if(status == false) {
                    Questions.updateOne(
                        {_id: id},
                        {$push: {
                            downvote: {userId: decode.id}
                        }}
                    )
                    .then((result) => {
                        res.status(200).json({
                            message: 'downvote berhasil!'
                         })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
                 }else{
                    res.status(200).json({
                        message: 'sudah nge-vote!'
                     })
                 }  
             }
         })
         .catch((err) => {
             res.status(400).json({
                 message: err.message
             })
         })
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
                                name: decode.name,
        
                            }}
                    }
                )
                .then((result) => {
                    res.status(200).json({
                        message: 'add answer berhasil!'
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

        User.findOne({_id: req.user._id})
        .then((result) => {
            console.log(result);
            
            if(result._id.toLocaleString() == decode.id.toLocaleString()) {

                res.status(200).json({
                   message: 'dilarang vote answer sendiri!'
                })

            } else {

                Questions.findOne({_id: id})
                .then((result) => {   
                        let status = false
                        let dataTmpAnswer
                        result.answer.forEach(element => {
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
                        let allAnswer = result.answer
                        allAnswer.forEach(element => {
                            if(element._id == idAnswer) {
                                element = dataTmpAnswer 
                            }
                            
                        })
        
                        if(status == false) {
                                Questions.updateOne(
                                {_id: id},
                                {$set: {
                                    answer: allAnswer
                                }}
                            )
                            .then((result) => {
                                res.status(200).json({
                                    message: 'upvote berhasil!'
                                 })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: err.message
                                })
                            });
                         }
                         else{
                            res.status(200).json({
                                message: 'sudah nge-vote!'
                             })
                         } 
                    
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                    
                });

            }

        })
        .catch((err) => {
            
            res.status(400).json({
                message: err.message
            })

        });
       
    },

    downvoteAnswer: function (req, res ) {
        let id = req.params.id 
        let token = req.headers.token
        let idAnswer = req.body.idAnswer 
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        User.findOne({_id: req.user._id})
        .then((result) => {
            
            if(result._id.toLocaleString() == decode.id.toLocaleString()) {
                
                res.status(200).json({
                   message: 'dilarang vote answer sendiri!'
                })

            } else {

                Questions.findOne({_id: id})
                .then((result) => {   
                   
                        let status = false
                        let dataTmpAnswer
                        result.answer.forEach(element => {
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
                        let allAnswer = result.answer
                        allAnswer.forEach(element => {
                            if(element._id == idAnswer) {
                                element = dataTmpAnswer 
                            }
                            
                        })
        
                        if(status == false) {
                                Questions.updateOne(
                                {_id: id},
                                {$set: {
                                    answer: allAnswer
                                }}
                            )
                            .then((result) => {
                                res.status(200).json({
                                    message: 'upvote berhasil!'
                                 })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: err.message
                                })
                            });
                         }
                         else{
                            res.status(200).json({
                                message: 'sudah nge-vote!'
                             })
                         } 
                    
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                    
                });

            }

        })
        .catch((err) => {

            res.status(400).json({
                message: err.message
            })

        });
       
    },

    updateAnswer: function (req, res) {
        let id = req.params.id 
        let token = req.headers.token
        let idAnswer = req.body.idAnswer 
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        Questions.findOne({_id: id})
        .then((result) => {
            
            if (result.userId.toLocaleString() == req.user._id.toLocaleString()) {
                
                result.answer.forEach(element => {
                    if(element._id == idAnswer) {
                        element.answer = req.body.answer
                    }
                })
                
                Questions.updateOne({_id: id},
                    {$set: {
                        answer: result.answer
                    }}
                )
                .then((result) => {
                    res.status(200).json({
                        message: 'update answer berhasil!'
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
    }



}
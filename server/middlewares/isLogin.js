const jwt = require("jsonwebtoken");
const User = require('../models/user')

module.exports = {

    isLogin: function (req, res, next) {
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(token){
            User.findOne({email: decode.email})
            .then((data) => {
                if(data){
                    req.user = data
                    next()
                }else{
                    res.status(400).json({
                        message: err.message
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    message: 'User must be Log In'
                })
            });
            
        }else{
            res.status(400).json({
                message: 'User must be Log In'
            })
        }
    }

} 
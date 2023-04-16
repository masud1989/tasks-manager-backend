const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel');

// exports.registration = (req, res) => {
    
//     let reqBody = req.body;

//     UserModel.create(reqBody)
//         .then((result) => {
//             res.status(200).json({status: 'success', data: result})
//             })
//         .catch((err) => {
//         res.status(400).json({status: 'fail', data: err})
//         })
// }


// User Registration 
exports.registration = (req, res) => {
    let reqBody = req.body;
    UserModel.create(reqBody, (error, data) => {
        if(error){
            res.status(200).json({status:'fail', data:error})
        }
        else{
            res.status(200).json({status:'success', data:data})
        }
    })
}


// User Login ============================================
exports.login = (req, res) => {

    let reqBody = req.body;
    UserModel.aggregate([
        {$match: reqBody},
        {$project: {_id: 0, name: 1, email: 1, mobile: 1, address: 1, photo: 1 }} 
    ], (error, data) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error})
        }
        else{
            if(data.length > 0){
                let payload = {exp: Math.floor(Date.now()/1000) + (24*60*60), data: data[0]['email']}
                let token = jwt.sign(payload, 'SecretKey12345')
                res.status(200).json({status: 'success', token:token, data:data[0]})
            }
            else{
                res.status(401).json({status: 'Unauthorized Access'})
            }
        }
    })
}

exports.profileUpdate = (req, res) => {
    
    let email = req.headers['email']
    let reqBody = req.body;

    UserModel.updateOne({email:email}, reqBody, (err,data) => {
        if(err){
            res.status(400).json({status: 'fail', data:err})
        }
        else{
            res.status(200).json({status: 'success' , data: data})
        }
    })

}
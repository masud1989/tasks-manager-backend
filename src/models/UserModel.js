const mongoose = require('mongoose');

const DataChema = mongoose.Schema(
    {
        email:{type: String, unique: true},
        name: {type: String},
        address: {type: String},
        mobile: {type: String},
        password: {type: String},
        photo: {type: String},
        createdDate: {type: Date, default:Date.now()},
    },
    {versionKey: false}
);

const UserModel = mongoose.model('users', DataChema);
module.exports = UserModel;
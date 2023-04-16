const mongoose = require('mongoose');

const DataChema = mongoose.Schema(
    {
        title: {type: String, unique: true},
        description: {type: String},
        status: {type: String},
        email: {type: String},
        createdDate: {type: Date, default:Date.now()},
    },
    {versionKey: false}
);

const TaskModel = mongoose.model('tasks', DataChema);
module.exports = TaskModel;
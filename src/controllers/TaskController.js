const TaskModel = require('../models/TaskModel');

// Cretate Task 
exports.createTask = (req, res) => {

    let reqBody = req.body;
    reqBody.email = req.headers['email'];

    TaskModel.create(reqBody, (error, data) => {
        if(error){
            res.status(400).json({status:'fail', data:error})
        }
        else{
            res.status(200).json({status:'success', data:data})
        }
    })
}

// Delete Task 
exports.deleteTask = (req, res) => {

    let id = req.params.id;
    let query = {_id: id};

    TaskModel.remove(query, (error, data) => {
        if(error){
            res.status(400).json({status:'fail', data:error})
        }
        else{
            res.status(200).json({status:'success', data:data})
        }
    })
}

// Update Status 
exports.updateTaskStatus = (req, res) => {

    let id = req.params.id;
    let status = req.params.status;
    let query = {_id: id};
    let reqBody = {status:status};

    TaskModel.updateOne(query, reqBody, (error, data) => {
        if(error){
            res.status(400).json({status:'fail', data:error})
        }
        else{
            res.status(200).json({status:'success', data:data})
        }
    })
}

// Task List By Status
exports.taskListByStatus = (req, res) => {
    
    let status = req.params.status;
    let email = req.headers['email'];

    TaskModel.aggregate([
        {$match: {status:status, email:email}},
        {$project: {
            _id:1, title:1, description:1, status:1,
            createdDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
        }}
    ], (error, data) => {
        if(error){
            res.status(400).json({status:'fail', data:error})
        }
        else{
            res.status(200).json({status:'success', data:data})
        }
    })
}

// Task Status Count
exports.tasksCountByStatus = (req, res) => {

    let email = req.headers['email'];
    
    TaskModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status", sum: {$count: {}}}}
    ], (error, data) => {
        if(error){
            res.status(400).json({status:'fail', data:error})
        }
        else{
            res.status(200).json({status:'success', data:data})
        }
    })
}

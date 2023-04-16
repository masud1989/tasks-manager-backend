const express = require('express');
const { registration, login, profileUpdate } = require('../controllers/userController');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const {createTask, deleteTask, updateTaskStatus, taskListByStatus, tasksCountByStatus} = require('../controllers/TaskController');
const router = express.Router();

//Routes Here===========================
router.post('/registration', registration);
router.post('/login', login);
router.post('/profileUpdate', AuthVerifyMiddleware, profileUpdate);
router.post('/createTask', AuthVerifyMiddleware, createTask);
router.get('/deleteTask/:id', AuthVerifyMiddleware, deleteTask);
router.get('/updateTaskStatus/:id/:status', AuthVerifyMiddleware, updateTaskStatus);
router.get('/taskListByStatus/:status', AuthVerifyMiddleware, taskListByStatus);
router.get('/tasksCountByStatus', AuthVerifyMiddleware, tasksCountByStatus);


module.exports = router;
const router = require('express').Router();
const { createTask, deleteTask } = require('../controller/tasks');

router.post('/api/boards/:id/tasks', createTask);
router.delete('/api/boards/:boardId/tasks/:taskId', deleteTask);

module.exports = router;
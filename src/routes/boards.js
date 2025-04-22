const router = require('express').Router();
const { getBoards, createBoard, deleteBoard } = require('../controller/boards');

/** Get all boards with tasks */
router.get('/api/boards', getBoards);
router.post('/api/boards', createBoard);
router.delete('/api/boards/:id', deleteBoard);

module.exports = router;
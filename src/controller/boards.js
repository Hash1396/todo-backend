
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

/**
 * Board schema for validation
 */
const boardSchema = z.object({
    name: z.string().min(1, "Board name is required"),
});

/** Get all boards with tasks */
exports.getBoards = async (req, res) => {
    const boards = await prisma.board.findMany({
        include: {
            tasks: true,
        },
    });

    const formatted = boards.map(board => ({
        ...board,
        tasks: {
            todo: board.tasks.filter(t => t.status === 'todo'),
            doing: board.tasks.filter(t => t.status === 'doing'),
            done: board.tasks.filter(t => t.status === 'done'),
        },
    }));

    res.json(formatted);
};

/** Create a new board */
exports.createBoard = async (req, res) => {
    try {
        const data = boardSchema.parse(req.body);
        const board = await prisma.board.create({ data });
        res.status(201).json({ ...board, tasks: { todo: [], doing: [], done: [] } });
    } catch (err) {
        res.status(400).json({ error: err.errors || err.message });
    }
};

/** Delete a board */
exports.deleteBoard = async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.task.deleteMany({ where: { boardId: id } });
    await prisma.board.delete({ where: { id } });
    res.sendStatus(204);
};
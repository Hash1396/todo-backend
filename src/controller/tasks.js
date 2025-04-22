
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

/**
 * Task schema
 */
const taskSchema = z.object({
    text: z.string().min(1, "Task cannot be empty"),
    status: z.enum(["todo", "doing", "done"]),
});

/** Add a task to a board */
exports.createTask = async (req, res) => {
    try {
        const boardId = parseInt(req.params.id);
        const data = taskSchema.parse(req.body);
        const task = await prisma.task.create({
            data: {
                ...data,
                boardId,
            },
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.errors || err.message });
    }
};

/** Delete a task */
exports.deleteTask = async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    await prisma.task.delete({ where: { id: taskId } });
    res.sendStatus(204);
};
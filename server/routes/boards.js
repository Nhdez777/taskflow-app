const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const boards = await prisma.board.findMany({
    where: { userId: req.user.id },
    include: { columns: { include: { tasks: true }, orderBy: { order: 'asc' } } },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(boards);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const board = await prisma.board.create({
    data: {
      title,
      userId: req.user.id,
      columns: {
        create: [
          { title: 'To Do', order: 0 },
          { title: 'In Progress', order: 1 },
          { title: 'Done', order: 2 }
        ]
      }
    },
    include: { columns: true }
  });
  res.status(201).json(board);
});

router.delete('/:id', async (req, res) => {
  await prisma.board.delete({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ success: true });
});

module.exports = router;

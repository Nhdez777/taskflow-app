const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { title, columnId, label, dueDate } = req.body;
  const task = await prisma.task.create({
    data: { title, columnId, label, dueDate: dueDate ? new Date(dueDate) : null }
  });
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const { title, columnId, order, label, dueDate } = req.body;
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: { title, columnId, order, label, dueDate: dueDate ? new Date(dueDate) : undefined }
  });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;

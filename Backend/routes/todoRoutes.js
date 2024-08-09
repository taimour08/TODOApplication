const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Add a new todo
router.post('/todos', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTodo = new Todo({
            title,
            description
        });
        await newTodo.save();
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(500).send({ error: 'Error creating todo' });
    }
});

// Get all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching todos' });
    }
});

// Toggle a todo's completion status
router.patch('/todos/:id/toggle', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ error: 'Error toggling todo' });
    }
});

// Remove a todo
router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send({ error: 'Error deleting todo' });
    }
});

module.exports = router;

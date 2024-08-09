var express = require('express');
const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model for the Todo schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

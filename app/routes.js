'use strict'

var express = require('express');
var todoRoutes = express.Router();
var Todo = require('./todo.model');

//get all todos in the db
todoRoutes.route('/all').get((req, res, next) => {
    Todo.find((err, todos) => {
        if (err) return next(new Error(err));

        res.json(todos) //return all todos
    });
});

//create a todo item
todoRoutes.route('/add').post((req, res) => {
    Todo.create(
        {
            name: req.body.name,
            completed: false
        },
        (error, todo) => {
            if (error) 
                req.status(400).send('Unable to create todo list');
                
            res.status(200).json(todo);
        }
    )
});

//delete a todo item
todoRoutes.route('/delete/:id').get((req, res, next) => {
    var id = req.params.id;
    Todo.findByIdAndRemove(id, (err, todo) => {
        if (err) return next(new Error('Todo was not found'));
        
        res.json('Successfully removed');
    });
});

//perform update on todo item
todoRoutes.route('/update/:id').post((req, res, next) => {
    var id = req.params.id;
    Todo.findById(id, (error, todo) => {
        if (error) return next(new Error('Todo was not found'))

        todo.name = req.body.name;
        todo.completed = req.body.completed;

        todo.save({
            function (error, todo) {
                if (error)
                    res.status(400).send('Unable to update todo');
                
                res.status(200).json(todo);
            }
        });
    });
});

module.exports = todoRoutes;
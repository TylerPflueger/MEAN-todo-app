var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

/**
 * Find todo by id
 */
router.param('todoId', function(req, res, next, id) {
  Todo.findById(id, function(err, todo) {
    if (err) return next(err);
    if (!todo) return next(new Error('Failed to load todo ' + id));
    req.todo = todo;
    next();
  });
});

/**
 * List of todos
 */
router.get('/api/todo', function(req, res, next) {
  Todo.find().sort('-createdAt').exec(function(err, todos) {
    if(err){ return next(err); }

    res.json(todos);
  });
});

/**
 * Show a todo
 */
router.get('/api/todo/:todoId', function(req, res) {
  res.json(req.todo);
});

/**
 * Create a todo
 */
router.post('/api/todo', function(req, res, next) {
  var todo = new Todo(req.body);

  todo.save(function(err, todo) {
    if(err){ return next(err); }

    res.json(todo);
  });
});

/**
 * Update a todo
 */
router.put('/api/todo/:todoId', function (req, res, next) {
  var newTodo = req.body;
  var id = newTodo._id;
  delete newTodo._id;

  Todo.update({_id : id}, newTodo, { }, function (err) {
    if(err){ return next(err); }

    newTodo._id = id;
    res.json(newTodo);
  });
});

/**
 * Remove a todo
 */
router.delete('/api/todo/:todoId', function (req, res, next) {
  var todo = req.todo;

  todo.remove(function(err) {
    if(err){ return next(err); }

    res.json(todo);
  });
});

module.exports = router;

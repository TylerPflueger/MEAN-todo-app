'use strict';

angular.module('todomvcApp')
    .controller('MainCtrl', function ($scope, $timeout, Todo, filterFilter, $location) {
        $scope.todos = [];
        $scope.newTodo = '';
        $scope.editedTodo = null;
        $scope.status = $location.search().q || '';

        $scope.$watch('todos', function (newVal, oldVal) {
            newVal.forEach(function(val, i) {
                if(!oldVal[i]) {
                    return;
                }
                if(val.completed !== oldVal[i].completed) {
                    var index = i;
                    var id = val._id;
                    Todo.updateTodo(id, $scope.todos[index]).then(function(todo) {
                        $scope.todos[index] = todo;
                    }, function(error) {
                        console.log(error);
                    });
                }
            });
            $scope.remainingCount = filterFilter($scope.todos, { completed: false }).length;
            $scope.completedCount = $scope.todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true);

        // Monitor the current location for changes and adjust the filter accordingly.
        $scope.$on('$locationChangeSuccess', function () {
            var status = $scope.status = $location.search().q || '';
            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        });

        $scope.addTodo = function () {
            var todoTitle = $scope.newTodo.trim();
            if (!todoTitle.length) {
                return;
            }

            var newTodo = {
                title: todoTitle,
                completed: false
            };
            Todo.addTodo(newTodo).then(function(todo) {
                $scope.todos.unshift(todo);
                $scope.newTodo = '';
            }, function(error) {
                console.log(error);
            });
        };

        $scope.editTodo = function (id) {
            $scope.editedTodo = $scope.todos[id];
            $scope.originalTodo = angular.extend({}, $scope.editedTodo);
        };

        $scope.doneEditing = function (id) {
            $scope.editedTodo = null;
            var title = $scope.todos[id].title.trim();
            if (title) {
                Todo.updateTodo($scope.todos[id]._id, $scope.todos[id]).then(function(todo) {
                    $scope.todos[id] = todo;
                }, function(error) {
                    console.log(error);
                });
            } else {
                $scope.removeTodo(id);
            }
        };

        $scope.revertEditing = function (id) {
            $scope.todos[id] = $scope.originalTodo;
            $scope.doneEditing(id);
        };

        $scope.removeTodo = function (id) {
            Todo.removeTodo($scope.todos[id]._id).then(function(todo) {
                $scope.todos.splice(id,1);
            }, function(error) {
                console.log(error);
            });
        };

        $scope.toggleCompleted = function (id) {
            var todo = $scope.todos[id];
            todo.completed = !todo.completed;
            todo.$update();
        };

        $scope.clearCompletedTodos = function () {
            var remainingTodos = [];
            angular.forEach($scope.todos, function (todo) {
                if (todo.completed) {
                    todo.$remove();
                } else {
                    remainingTodos.push(todo);
                }
            });
            $scope.todos = remainingTodos;
        };

        $scope.markAll = function (allCompleted) {
            angular.forEach($scope.todos, function (todo) {
                todo.completed = !allCompleted;
                todo.$update();
            });
        };

        // Poll server to regularly update todos
        (function refreshTodos() {
            Todo.getTodos().then(function(todos) {
                if($scope.editedTodo === null) {
                    $scope.todos = todos;
                }
                $scope.promise = $timeout(refreshTodos, 5000);
            }, function(error) {
               console.log(error);
            });
        })();

        $scope.$on('destroy', function(){
            $timeout.cancel($scope.promise);
        });
    });
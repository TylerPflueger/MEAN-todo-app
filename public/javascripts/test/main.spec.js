(function () {
    'use strict';

    describe('Main Controller', function () {
        var $rootScope,
            $scope,
            $controller,
            $q,
            Todo,
            todos,
            newTodo,
            changedTodo,
            getTodoDeferred,
            addTodoDeferred,
            deleteTodoDeferred,
            updateTodoDeferred,
            ctrl;

        beforeEach(module('todomvcApp'));

        beforeEach(module(function ($provide) {
            Todo = {
                getTodos: function() { },
                addTodo: function() { },
                removeTodo: function() { },
                updateTodo: function() { }
            };
            $provide.value('Todo', Todo);
        }));

        beforeEach(inject(function (_$rootScope_, _$controller_, _$q_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $scope = $rootScope.$new();
            $q = _$q_;

            todos = [{_id: 1, id: 1, title: 'Test1', completed: false}, {_id: 2, id: 2, title: 'Test2', completed: false}];
            getTodoDeferred = $q.defer();
            spyOn(Todo, 'getTodos').and.returnValue(getTodoDeferred.promise);

            addTodoDeferred = $q.defer();
            spyOn(Todo, 'addTodo').and.returnValue(addTodoDeferred.promise);

            deleteTodoDeferred = $q.defer();
            spyOn(Todo, 'removeTodo').and.returnValue(deleteTodoDeferred.promise);

            updateTodoDeferred = $q.defer();
            spyOn(Todo, 'updateTodo').and.returnValue(updateTodoDeferred.promise);

            ctrl = $controller('MainCtrl', {
                $scope: $scope
            });
        }));

        describe('On scope', function () {
            it('Should set todos', function () {
                expect($scope.todos).toBeDefined();
            });

            it('Should set newTodo', function () {
                expect($scope.newTodo).toEqual('');
            });

            it('Should set editedTodo', function () {
               expect($scope.editedTodo).toBeNull();
            });
        });

        describe('On intialization', function () {
            describe('and successful', function () {
                beforeEach(function () {
                    getTodoDeferred.resolve([{id:1}, {id:2}]);
                    $rootScope.$digest();
                });

                it('Should set $scope.todos', function () {
                    expect($scope.todos.length).toEqual(2);
                });
            });

            describe('and unsuccessful', function () {
                beforeEach(function () {
                    getTodoDeferred.reject();
                    $rootScope.$digest();
                });

                it('Should not set $scope.todos', function () {
                    expect($scope.todos.length).toEqual(0);
                });
            });
        });

        describe('On polling', function () {
            describe('And editing', function () {
                beforeEach(function () {
                    $scope.editedTodo = {};
                    $scope.todos = [{id: 1, title:'Test'}];
                    getTodoDeferred.resolve([{id:1}, {id:2}]);
                    $rootScope.$digest();
                });

                it('Should not repoll for todos', function () {
                    expect($scope.todos[0].title).toEqual('Test');
                });
            });

            describe('Not editing', function () {
                beforeEach(function () {
                    getTodoDeferred.resolve([{id:1}, {id:2}]);
                    $rootScope.$digest();
                });

                it('Should get todos', function () {
                    expect($scope.todos.length).toEqual(2);
                });
            });
        });

        describe('When a todo changes', function () {
            beforeEach(function () {
                changedTodo = _.cloneDeep(todos);
                changedTodo[0].completed = true;
                $scope.todos = todos;
                $rootScope.$digest();
            });

            it('Should not call update', function () {
                $scope.todos = todos;
                $rootScope.$digest();
                expect($scope.todos).toEqual(todos);
            });

            it('Should call update', function () {
                $scope.todos[0].completed = true;
                $rootScope.$digest();
                expect(Todo.updateTodo).toHaveBeenCalledWith($scope.todos[0]._id, $scope.todos[0]);
            });
        });

        describe('When adding a todo', function () {
            beforeEach(function () {
                newTodo = {title: 'New todo', completed: false};
                $scope.newTodo = 'New todo';
                $scope.addTodo();
            });

            describe('and was successful', function () {
                beforeEach(function () {
                    addTodoDeferred.resolve(newTodo);
                    $rootScope.$digest();
                });

                it('Should call update', function () {
                    expect(Todo.addTodo).toHaveBeenCalledWith(newTodo);
                });

                it('Should update newTodo', function () {
                    expect($scope.newTodo).toEqual('');
                });

                it('Should update todo list', function () {
                    expect($scope.todos.length).toEqual(1);
                });
            });

            describe('and was unsuccessful', function () {
                beforeEach(function () {
                    addTodoDeferred.reject();
                    $rootScope.$digest();
                });

                it('Should not update newTodo', function () {
                    expect($scope.newTodo).toEqual('New todo');
                });

                it('Should not update todo list', function () {
                    expect($scope.todos.length).toEqual(0);
                });
            });
        });

        describe('When editing a todo', function () {
            var updatedTodo,
                originalTodo;
            beforeEach(function () {
                originalTodo = todos[1];
                $scope.todos = todos;
                updatedTodo = _.cloneDeep($scope.todos[1]);
                updatedTodo.title = 'Updated Title';
                $scope.editTodo(1);
            });

            it('Should set editedTodo to todo editing', function () {
                expect($scope.editedTodo).toEqual($scope.todos[1]);
            });

            describe('and done editing', function () {
                beforeEach(function () {
                    $scope.doneEditing(1);
                });

                it('Should set editedTodo', function () {
                    expect($scope.editedTodo).toBeNull();
                });

                describe('successful update', function () {
                    beforeEach(function () {
                        updateTodoDeferred.resolve(updatedTodo);
                        $rootScope.$digest();
                    });

                    it('Should call update', function () {
                        expect(Todo.updateTodo).toHaveBeenCalled();
                    });

                    it('Should update todo', function () {
                        expect($scope.todos[1]).toEqual(updatedTodo);
                    });
                });

                describe('unsuccessfull to update', function () {
                    beforeEach(function () {
                        updateTodoDeferred.reject();
                    });
                    it('Shouldn\'t update todo', function () {
                        expect($scope.todos).toEqual(todos);
                    });
                });
            });

            describe('and revert edit', function () {
                beforeEach(function () {
                    $scope.revertEditing(1);
                    $scope.$digest();
                });

                it('Should revert todo back to original state', function () {
                    expect($scope.todos[1]).toEqual(originalTodo);
                });
            });
        });

        describe('When removing a todo', function () {
            beforeEach(function () {
                $scope.todos = todos;
                $scope.removeTodo(1);
            });
            describe('And successful', function () {
                beforeEach(function () {
                    deleteTodoDeferred.resolve({});
                    $rootScope.$digest();
                });

                it('Should remove todo', function () {
                    expect($scope.todos.length).toEqual(1);
                });
            });

            describe('and unsuccessful', function () {
                beforeEach(function () {
                    deleteTodoDeferred.reject();
                    $rootScope.$digest();
                });

                it('Should not remove todo', function () {
                    expect($scope.todos.length).toEqual(2);
                });
            });
        });
    });
})();
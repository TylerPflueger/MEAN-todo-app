(function () {
	'use strict';

	describe('Todo Service', function () {
		var TodoService,
			todo,
			updatedTodo,
			$httpBackend;

		beforeEach(module('todomvcApp'));

		beforeEach(inject(function (Todo, _$httpBackend_) {
			TodoService = Todo;
			$httpBackend = _$httpBackend_;
			todo = {id: 1, completed: false};
			updatedTodo = {id: 1, completed: false};
		}));

		describe('Get todos', function () {
			it('Get to API', function () {
				$httpBackend.expectGET('api/todo').respond(200);
				TodoService.getTodos();
				$httpBackend.verifyNoOutstandingExpectation();
			});

			it('Should return todos', function () {
				$httpBackend.expectGET('api/todo').respond(200, { id:1, completed:false});

				TodoService.getTodos().then(function(data) {
					expect(data).toBeDefined();
				});
			});

			it('Should fail and return error', function () {
				$httpBackend.expectGET('api/todo').respond(500);

				TodoService.getTodos().catch(function(er) {
					expect(er).toBeDefined();
				});

				$httpBackend.flush();
			});
		});

		describe('Add todos', function () {
			it('Add to API', function () {
				$httpBackend.expectPOST('api/todo').respond(200);
				TodoService.addTodo();
				$httpBackend.verifyNoOutstandingExpectation();
			});

			it('Should add todo', function () {
				$httpBackend.expectPOST('api/todo').respond(200, todo);

				TodoService.addTodo().then(function(data) {
					expect(data).toEqual(todo);
				});
			});

			it('Should fail and return error', function () {
				$httpBackend.expectPOST('api/todo').respond(500);

				TodoService.addTodo().catch(function(er) {
					expect(er).toBeDefined();
				});

				$httpBackend.flush();
			});
		});

		describe('Remove a todo', function () {
			it('Remove to API', function () {
				$httpBackend.expectDELETE('api/todo/1').respond(200);
				TodoService.removeTodo(1);
				$httpBackend.verifyNoOutstandingExpectation();
			});

			it('Should remove todo', function () {
				$httpBackend.expectDELETE('api/todo/1').respond(200);

				TodoService.addTodo().then(function(data) {
					expect(data).toBeDefined();
				});
			});

			it('Should fail and return error', function () {
				$httpBackend.expectDELETE('api/todo/1').respond(500);

				TodoService.removeTodo(1).catch(function(er) {
					expect(er).toBeDefined();
				});

				$httpBackend.flush();
			});
		});

		describe('Update a todo', function () {
			it('Update to API', function () {
				$httpBackend.expectPUT('api/todo/1').respond(200);
				TodoService.updateTodo(1, updatedTodo);
				$httpBackend.verifyNoOutstandingExpectation();
			});

			it('Should update todo', function () {
				$httpBackend.expectPUT('api/todo/1').respond(200, updatedTodo);

				TodoService.updateTodo(1, updatedTodo).then(function(data) {
					expect(data).toEqual(updatedTodo);
				});
			});

			it('Should fail and return error', function () {
				$httpBackend.expectPUT('api/todo/1').respond(500);

				TodoService.updateTodo(1, updatedTodo).catch(function(er) {
					expect(er).toBeDefined();
				});

				$httpBackend.flush();
			});
		});
	});
})();
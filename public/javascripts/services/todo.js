'use strict';

angular.module('todomvcApp')
    .factory('Todo', function ($http, $q, $resource) {

        function getTodos() {
            var url = ['api','todo'].join('/'),
                deferred = $q.defer();

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function addTodo(todo) {
            var url = ['api','todo'].join('/'),
                deferred = $q.defer();

            $http.post(url, todo).success(function(data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function removeTodo(todoId) {
            var url = ['api','todo', todoId].join('/'),
                deferred = $q.defer();

            $http.delete(url).success(function(data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function updateTodo(todoId, todo) {
            var url = ['api','todo', todoId].join('/'),
                deferred = $q.defer();

            $http.put(url, todo).success(function(data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return {
            getTodos: getTodos,
            addTodo: addTodo,
            removeTodo: removeTodo,
            updateTodo: updateTodo
        };
    });
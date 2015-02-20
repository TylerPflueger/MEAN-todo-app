'use strict';

angular.module('todomvcApp')
    .factory('Todo', function ($resource) {
        return $resource('api/todo/:todoId', {
            todoId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
(function () {
    'use strict';

    describe('Main Controller', function () {
        var $rootScope,
            $scope,
            ctrl;

        beforeEach(module('todomvcApp'));

        beforeEach(inject(function (_$rootScope_, _$controller_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $scope = $rootScope.$new();

            ctrl = $controller('MainCtrl', {
                $scope: $scope
            });
        }));

    });
})();
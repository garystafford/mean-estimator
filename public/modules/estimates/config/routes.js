'use strict';

// Setting up route
angular.module('estimates').config(['$stateProvider',
    function ($stateProvider) {
        // Estimates state routing
        $stateProvider.
            state('listEstimates', {
                url        : '/estimates',
                templateUrl: 'modules/estimates/views/list.html'
            }).
            state('createEstimates', {
                url        : '/estimates/create',
                templateUrl: 'modules/estimates/views/create.html'
            }).
            state('viewEstimates', {
                url        : '/estimates/:estimateId',
                templateUrl: 'modules/estimates/views/view.html'
            }).
            state('editEstimates', {
                url        : '/estimates/:estimateId/edit',
                templateUrl: 'modules/estimates/views/edit.html'
            });
    }
]);
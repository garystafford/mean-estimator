'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
  function($scope, Authentication) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;

    $scope.menu = [{
      title: 'Estimates',
      link: 'estimates',
      uiRoute: '/estimates'
    }, {
      title: 'New Estimate',
      link: 'estimates/create',
      uiRoute: '/estimates/create'
    }];

    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
  }
]);
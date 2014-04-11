'use strict';

angular.module('estimates').controller('EstimatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Estimates',
  function($scope, $stateParams, $location, Authentication, Estimates) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var estimate = new Estimates({
        title: this.title,
        content: this.content
      });
      estimate.$save(function(response) {
        $location.path('estimates/' + response._id);
      });

      this.title = '';
      this.content = '';
    };

    $scope.remove = function(estimate) {
      if (estimate) {
        estimate.$remove();

        for (var i in $scope.estimates) {
          if ($scope.estimates[i] === estimate) {
            $scope.estimates.splice(i, 1);
          }
        }
      } else {
        $scope.estimate.$remove(function() {
          $location.path('estimates');
        });
      }
    };

    $scope.update = function() {
      var estimate = $scope.estimate;
      if (!estimate.updated) {
        estimate.updated = [];
      }
      estimate.updated.push(new Date().getTime());

      estimate.$update(function() {
        $location.path('estimates/' + estimate._id);
      });
    };

    $scope.find = function() {
      Estimates.query(function(estimates) {
        $scope.estimates = estimates;
      });
    };

    $scope.findOne = function() {
      Estimates.get({
        estimateId: $stateParams.estimateId
      }, function(estimate) {
        $scope.estimate = estimate;
      });
    };
  }
]);
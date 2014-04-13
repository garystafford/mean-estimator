'use strict';

angular.module('estimates').controller('EstimatesController', ['$scope', '$stateParams',
  '$location', 'Authentication', 'Estimates',
  function ($scope, $stateParams, $location, Authentication, Estimates) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var estimate = new Estimates({
        created: this.estimateForm.created,
        user: this.estimateForm.user,
        application: this.estimateForm.application,
        environment: this.estimateForm.environment,
        description: this.estimateForm.description,
        type: this.estimateForm.type,
        resources: [this.resourceForm],
        infrastructures: [this.infrastructureForm]
      });

      estimate.$save(function (response) {
        $location.path('estimates/' + response._id);
      });

      //resourceForm = {};
      //infrastructureForm = {};
      //estimateForm = {};
    };

    $scope.remove = function (estimate) {
      if (estimate) {
        estimate.$remove();

        for (var i in $scope.estimates) {
          if ($scope.estimates[i] === estimate) {
            $scope.estimates.splice(i, 1);
          }
        }
      } else {
        $scope.estimate.$remove(function () {
          $location.path('estimates');
        });
      }
    };

    $scope.update = function () {
      var estimate = $scope.estimate;
      if (!estimate.updated) {
        estimate.updated = [];
      }
      estimate.updated.push(new Date().getTime());

      estimate.$update(function () {
        $location.path('estimates/' + estimate._id);
      });
    };

    $scope.find = function () {
      Estimates.query(function (estimates) {
        $scope.estimates = estimates;
      });
    };

    $scope.findOne = function () {
      Estimates.get({
        estimateId: $stateParams.estimateId
      }, function (estimate) {
        $scope.estimate = estimate;
      });
    };

    $scope.resourceForm = {
      department: '',
      estimator: '',
      description: '',
      estimate: '',
      notes: ''
    };

    $scope.infrastructureForm = {
      department: '',
      estimator: '',
      description: '',
      estimate: '',
      cost: '',
      notes: ''
    };

    $scope.estimateForm = {
      created: new Date(),
      user: this.user,
      application: '',
      environment: '',
      description: '',
      type: '',
      resource: [],
      infrastructure: []
    };

    $scope.formValues = {
      types: [ 'Add', 'Update' ],
      environments: [ 'Environment A', 'Environment B', 'Environment C', 'Environment D', 'Environment E' ],
      departments: [ 'Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5' ],
      applications: [ 'Application 1', 'Application 2', 'Application 3', 'Application 4', 'Application 5' ]
    };
  }]);
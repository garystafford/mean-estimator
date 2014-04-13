'use strict';

angular.module('estimates').controller('EstimatesController', ['$scope', '$stateParams',
  '$location', 'Authentication', 'Estimates',
  function ($scope, $stateParams, $location, Authentication, Estimates) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var estimate = new Estimates({
        created: this.estimateForm.created,
        user: this.estimateForm.user,
        application: this.estimateForm.application.application,
        environment: this.estimateForm.environment.environment,
        description: this.estimateForm.description,
        type: this.estimateForm.type.type,
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
      types: [
        {type: 'Add'},
        {type: 'Update'}
      ],
      environments: [
        {environment: 'Environment A'},
        {environment: 'Environment B'},
        {environment: 'Environment C'},
        {environment: 'Environment D'},
        {environment: 'Environment E'}
      ],
      departments: [
        {department: 'Department 1'},
        {department: 'Department 2'},
        {department: 'Department 3'},
        {department: 'Department 4'},
        {department: 'Department 5'}
      ],
      applications: [
        {application: 'Application 1'},
        {application: 'Application 2'},
        {application: 'Application 3'},
        {application: 'Application 4'},
        {application: 'Application 5'}
      ]
    };
  }]);
'use strict';

angular.module('estimates').controller('EstimatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Estimates',
  function ($scope, $stateParams, $location, Authentication, Estimates) {
    $scope.authentication = Authentication;
    $scope.create = function () {

      var resource = {
        department: this.resourceForm.department.department,
        estimator: this.resourceForm.estimator,
        description: this.resourceForm.description,
        estimate: this.resourceForm.estimate,
        notes: this.resourceForm.notes
      };

      var infrastructure = {
        department: this.infrastructureForm.department.department,
        estimator: this.infrastructureForm.estimator,
        description: this.infrastructureForm.description,
        estimate: this.infrastructureForm.estimate,
        cost: this.infrastructureForm.cost,
        notes: this.infrastructureForm.notes
      };

      var estimate = new Estimates({
        created: new Date(),
        user: this.user,
        application: this.estimateForm.application.application,
        environment: this.estimateForm.environment.environment,
        description: this.estimateForm.description,
        type: this.estimateForm.type.type,
        resource: [resourceForm],
        infrastructure: [infrastructureForm]
      });

      estimate.$save(function (response) {
        $location.path('estimates/' + response._id);
      });

      //resource = {};
      //estimate = {};
      //estimate = {};
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


    $scope.formValues = {};
    $scope.estimateForm = {};
    $scope.resourceForm = {};
    $scope.infrastructureForm = {};

    $scope.estimateForm.environment = "";
    $scope.formValues.environments = [
      {environment: 'Environment A'},
      {environment: 'Environment B'},
      {environment: 'Environment C'},
      {environment: 'Environment D'},
      {environment: 'Environment E'}
    ];

    $scope.estimateForm.type = "";
    $scope.formValues.types = [
      {type: 'Add'},
      {type: 'Update'}
    ];

    $scope.resourceForm.department = "";
    $scope.infrastructureForm.department = "";

    $scope.formValues.departments = [
      {department: 'Department 1'},
      {department: 'Department 2'},
      {department: 'Department 3'},
      {department: 'Department 4'},
      {department: 'Department 5'}
    ];

    $scope.estimateForm.application = "";
    $scope.formValues.applications = [
      {application: 'Application 1'},
      {application: 'Application 2'},
      {application: 'Application 3'},
      {application: 'Application 4'},
      {application: 'Application 5'}
    ];
  }
]);
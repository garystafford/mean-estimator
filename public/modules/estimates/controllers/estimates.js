'use strict';

angular.module('estimates').controller('EstimatesController', ['$scope', '$stateParams',
  '$location', 'Authentication', 'Estimates',
  function ($scope, $stateParams, $location, Authentication, Estimates) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var estimate = new Estimates({
        user: this.estimateForm.user,
        application: this.estimateForm.application,
        environment: this.estimateForm.environment,
        description: this.estimateForm.description,
        type: this.estimateForm.type,
        resources: this.resourceArray,
        infrastructures: this.infrastructureArray
      });

      estimate.$save(function (response) {
        $location.path('estimates/' + response._id);
      });
    };

    $scope.copy = function () {
      var estimate = new Estimates({
        user: $scope.user,
        application: $scope.estimate.application,
        environment: $scope.estimate.environment,
        description: '(** COPY **): ' + $scope.estimate.description,
        type: this.estimateForm.type,
        resources: $scope.estimate.resources,
        infrastructures: $scope.estimate.infrastructures
      });

      estimate.$save(function (response) {
        $location.path('estimates/' + response._id);
      });
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

    $scope.update = function () { // build estimate object
      var estimate = $scope.estimateForm;
      estimate.resources = $scope.resourceArray;
      estimate.infrastructures = $scope.infrastructureArray;

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
        $scope.estimateForm = estimate;
        $scope.resourceArray = estimate.resources;
        $scope.infrastructureArray = estimate.infrastructures;
      });
    };

// add a resource or infrastructure item to estimate
    $scope.addToArray = function (objectType) {
      if (objectType === 'resource') { //resource
        this.resourceArray.push(this.resourceForm);
        this.resourceForm = {}; //clear form
      } else { // infrastructure
        this.infrastructureArray.push(this.infrastructureForm);
        this.infrastructureForm = {}; // clear form
      }
    };

// remove a resource or infrastructure item to estimate
    $scope.removeFromArray = function (objectType, position) {
      if (objectType === 'resource') { //resource
        this.resourceArray.splice(position, 1);
      } else { // infrastructure
        this.infrastructureArray.splice(position, 1);
      }
    };

// move a resource or infrastructure item to estimate form
    $scope.moveToEdit = function (objectType, position) {
      if (objectType === 'resource') { //resource
        $scope.resourceForm = this.resourceArray[position];
      } else { // infrastructure
        $scope.infrastructureForm = this.infrastructureArray[position];
      }
      this.removeFromArray(objectType, position);
    };

    $scope.resourceArray = []; // holds individual resources
    $scope.infrastructureArray = []; // holds individual infrastructures


// three objects hold form values (two way data-binding)
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
      user: this.user,
      application: '',
      environment: '',
      description: '',
      type: ''
    };

// groups of items for form select objects
    $scope.formValues = {
      types: [ 'Add', 'Update', 'Remove' ],
      environments: [ 'Environment A', 'Environment B', 'Environment C',
        'Environment D', 'Environment E' ],
      departments: [ 'Department 1', 'Department 2', 'Department 3',
        'Department 4', 'Department 5' ],
      applications: [ 'Application 1', 'Application 2', 'Application 3',
        'Application 4', 'Application 5' ]
    };
  }
])
;
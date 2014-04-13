'use strict';

angular.module('estimates').controller('EstimatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Estimates',
  function ($scope, $stateParams, $location, Authentication, Estimates) {
    $scope.authentication = Authentication;
    $scope.create = function () {

      var resource = {
        department: this.resourceForm.department.department,
        estimator: this.resourceForm.estimator,
        description: this.resource.description,
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
        description: this.estimate.description,
        type: this.estimateForm.type.type,
        resource: resource,
        infrastructure: infrastructure
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
      {environment: 'N2A'},
      {environment: 'N2B'},
      {environment: 'N2C'},
      {environment: 'DVS3'},
      {environment: 'DVS4'}
    ];

    $scope.estimateForm.type = "";
    $scope.formValues.types = [
      {type: 'Add'},
      {type: 'Update'}
    ];

    $scope.estimateForm.department = "";
    $scope.resourceForm.department = "";
    $scope.infrastructureForm.department = "";

    $scope.formValues.departments = [
      {department: 'Data and Systems Security'},
      {department: 'Data Center Operations (Tidal)'},
      {department: 'DBAs - Exadata/Other'},
      {department: 'DBAs - MSSQL'},
      {department: 'DBAs - Oracle'},
      {department: 'Enterprise Build Automation (EBA)'},
      {department: 'Infrastructure (Systems Administration)'},
      {department: 'Infrastructure (Windows Server)'},
      {department: 'Network Services'},
      {department: 'Virtualization and Storage'},
      {department: 'Web Operations/Engineering'},
    ];

    $scope.estimateForm.application = "";
    $scope.formValues.applications = [
      {application: 'Core'},
      {application: 'Core Advanced (CA)'},
      {application: 'Electronic Network Services (ENS)'},
      {application: 'Enterprise Reporting Database (ERD)'},
      {application: 'Enterprise Data Warehouse (EDW)'},
      {application: 'Human Resource Services (HRS)/Paychex Distribution Center (PDC)'},
      {application: 'Human Resources Online (HRO)'},
      {application: 'HRO-IA Adapter (CA Integration)'},
      {application: 'Mobility'},
      {application: 'Online Reporting System (ORS)'},
      {application: 'Oracle Service Bus (OSB)/Enterprise Service'},
      {application: 'PNG SSO'},
      {application: 'PNGSSO Coherence'},
      {application: 'Report Center'},
      {application: 'Single Sign-on (SSO)/One Source Solution Portal (OSSP)'},
      {application: 'Time and Labor Online (TLO)'},
      {application: 'SurePayroll'},
    ];
  }
]);
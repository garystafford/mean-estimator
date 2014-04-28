'use strict';

//Reporting service used for communicating with the estimates REST endpoints
angular.module('reporting').factory('Reporting', ['$resource',
  this.getResourceEstimates = function ($resource) {
    return $resource('reporting/resources', {}, {
      query: {
        method: 'GET'
      }
    });
  },
  this.getInfrastructureEstimates = function ($resource) {
    return $resource('reporting/infrastructure', {}, {
      query: {
        method: 'GET'
      }
    });
  }
]);
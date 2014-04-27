'use strict';

//Reporting service used for communicating with the estimates REST endpoints
angular.module('reporting').factory('Reporting', ['$resource',
  this.getResourcesEstimates = function ($resource) {
    return $resource('reporting/resources/estimates', {}, {
      query: {
        method: 'GET'
      }
    });
  },
  this.getInfrastructuresEstimates = function ($resource) {
    return $resource('reporting/infrastructures/estimates', {}, {
      query: {
        method: 'GET'
      }
    });
  },
  this.getInfrastructuresCosts = function ($resource) {
    return $resource('reporting/infrastructures/costs', {}, {
      query: {
        method: 'GET'
      }
    });
  }
]);
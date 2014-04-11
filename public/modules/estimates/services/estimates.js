'use strict';

//Estimates service used for communicating with the estimates REST endpoints
angular.module('estimates').factory('Estimates', ['$resource',
  function($resource) {
    return $resource('estimates/:estimateId', {
      estimateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
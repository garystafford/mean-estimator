'use strict';

//Reporting service used for communicating with the estimates REST endpoints
angular.module('estimates').factory('Reporting', ['$resource',
    function getResourceEstimates($resource) {
        return $resource('reporting/resources', {}, {
            query: {
                method: 'GET'
            }
        });
    },
    function getInfrastructureEstimates($resource) {
        return $resource('reporting/infrastructure', {}, {
            query: {
                method: 'GET'
            }
        });
    }
]);
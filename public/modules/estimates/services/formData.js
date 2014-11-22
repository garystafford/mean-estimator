'use strict';

// // choose the form data file defined by the ENV_FORM_DATA
// // environment variable or default to basic template
// var formData = ;

// angular.module('estimates')
//   .factory('jsonFactory', function($q, $http) {
//     return {
//       getFormData: function() {
//         var deferred = $q.defer(),
//           httpPromise = $http.get(formData);

//         httpPromise.then(function(response) {
//           deferred.resolve(response);
//         }, function(error) {
//           console.error(error);
//         });

//         return deferred.promise;
//       }
//     };
//   });


// Users service used for communicating with the estimate REST endpoint
angular.module('estimates').factory('FormData', ['$resource',
    function ($resource) {
        return $resource('formdata', {}, {
            query: {
                method: 'GET'
            }
        });
    }
]);
'use strict';

(function () {
    // Estimates Controller Spec
    describe('EstimatesController', function () {
        // Initialize global variables
        var EstimatesController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

        var sampleFormData = {
            'environments': [
                'Environment A',
                'Environment B',
                'Environment C'
            ],
            'types'       : [
                'Type A',
                'Type B',
                'Type C'
            ],
            'departments' : [
                'Department A',
                'Department B',
                'Department C'
            ],
            'applications': [
                'Application 1',
                'Application 2',
                'Application 3'
            ]
        };

        // The $resource service augments the response object with methods for updating and deleting the resource.
        // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
        // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
        // When the toEqualData matcher compares two objects, it takes only object properties into
        // account and ignores methods.
        beforeEach(function () {
            jasmine.addMatchers({
                toEqualData: function (util, customEqualityTesters) {
                    return {
                        compare: function (actual, expected) {
                            return {
                                pass: angular.equals(actual, expected)
                            };
                        }
                    };
                }
            });
        });

        // Then we can start by loading the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            // Initialize the Estimates controller.
            EstimatesController = $controller('EstimatesController', {
                $scope: scope
            });
        }));

        it('$scope.find() should create an array with at least one estimate object fetched from XHR', inject(function (Estimates) {
            // Create sample estimate using the Estimates service
            var sampleEstimate = new Estimates({
                application    : 'Application 1',
                description    : 'estimate description',
                environment    : 'Environment C',
                type           : 'Update',
                user           : '534f5ef824e4b8551cce63ed',
                infrastructures: [
                    {
                        cost       : 1000,
                        department : 'Department 4',
                        description: 'infrastructure1 description',
                        estimate   : 10,
                        estimator  : 'infrastructure1 estimator',
                        notes      : 'infrastructure1 notes...'
                    }
                ],
                resources      : [
                    {
                        department : 'Department 1',
                        description: 'resource1 description',
                        estimate   : 15,
                        estimator  : 'resource1 estimator',
                        notes      : 'resource1 notes...'
                    }
                ]
            });

            // Create a sample estimates array that includes the new estimate
            var sampleEstimates = [sampleEstimate];

            // Set GET response
            $httpBackend.expectGET('estimates').respond(sampleEstimates);

            // When formdata GET happens then respond
            $httpBackend.whenGET('formdata').respond(sampleFormData);

            // Run controller functionality
            scope.find();
            $httpBackend.flush();

            // Test scope value
            expect(scope.estimates).toEqualData(sampleEstimates);
        }));

        it('$scope.findOne() should create an array with one estimate object fetched from XHR using a estimateId URL parameter', inject(function (Estimates) {
            // Define a sample estimate object
            var sampleEstimate = new Estimates({
                application    : 'Application 1',
                created        : '2014-04-17T04:56:35.086Z',
                description    : 'estimate description',
                environment    : 'Environment C',
                type           : 'Update',
                user           : '534f5ef824e4b8551cce63ed',
                infrastructures: [
                    {
                        cost       : 1000,
                        department : 'Department 4',
                        description: 'infrastructure1 description',
                        estimate   : 10,
                        estimator  : 'infrastructure1 estimator',
                        notes      : 'infrastructure1 notes...'
                    }
                ],
                resources      : [
                    {
                        department : 'Department 1',
                        description: 'resource1 description',
                        estimate   : 15,
                        estimator  : 'resource1 estimator',
                        notes      : 'resource1 notes...'
                    }
                ]
            });

            // Set the URL parameter
            $stateParams.estimateId = '525a8422f6d0f87f0e407a33';

            // Set GET response
            $httpBackend.expectGET(/estimates\/([0-9a-fA-F]{24})$/).respond(sampleEstimate);

            // When formdata GET happens then respond
            $httpBackend.whenGET('formdata').respond(sampleFormData);

            // Run controller functionality
            scope.findOne();
            $httpBackend.flush();

            // Test scope value
            expect(scope.estimate).toEqualData(sampleEstimate);
        }));

        xit('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function (Estimates) {
            // Create a sample estimate object
            var sampleEstimatePostData = new Estimates({
                application    : 'Application 1',
                description    : 'estimate description',
                environment    : 'Environment C',
                type           : 'Update',
                user           : '534f5ef824e4b8551cce63ed',
                infrastructures: [],
                resources      : []
            });

            // Create a sample estimate response
            var sampleEstimateResponse = new Estimates({
                _id            : '525cf20451979dea2c000001',
                application    : 'Application 1',
                description    : 'estimate description',
                environment    : 'Environment C',
                type           : 'Update',
                user           : '534f5ef824e4b8551cce63ed',
                infrastructures: [],
                resources      : []
            });

            // Fixture mock form input values
            scope.application = 'Application 1';
            scope.description = 'estimate description';
            scope.environment = 'Environment C';
            scope.type = 'Update';
            scope.infrastructures = [];
            scope.resources = [];

            // Set POST response
            $httpBackend.expectPOST('estimates', sampleEstimatePostData).respond(sampleEstimateResponse);

            // Run controller functionality
            scope.create();
            $httpBackend.flush();

            // Test form inputs are reset
            expect(scope.application).toEqual('');
            expect(scope.description).toEqual('');
            expect(scope.environment).toEqual('');
            expect(scope.type).toEqual('');
            // Test URL redirection after the estimate was created
            expect($location.path()).toBe('/estimates/' + sampleEstimateResponse._id);
        }));

        xit('$scope.update() should update a valid estimate', inject(function (Estimates) {
            // Define a sample estimate put data
            var sampleEstimatePutData = new Estimates({
                _id            : '525cf20451979dea2c000001',
                application    : 'Application 1',
                description    : 'estimate description',
                environment    : 'Environment C',
                type           : 'Update',
                user           : '534f5ef824e4b8551cce63ed',
                infrastructures: [
                    {
                        cost       : 1000,
                        department : 'Department 4',
                        description: 'infrastructure1 description',
                        estimate   : 10,
                        estimator  : 'infrastructure1 estimator',
                        notes      : 'infrastructure1 notes...'
                    }
                ],
                resources      : [
                    {
                        department : 'Department 1',
                        description: 'resource1 description',
                        estimate   : 15,
                        estimator  : 'resource1 estimator',
                        notes      : 'resource1 notes...'
                    }
                ]
            });

            // Mock estimate in scope
            scope.estimate = sampleEstimatePutData;

            // Set PUT response
            $httpBackend.expectPUT(/estimates\/([0-9a-fA-F]{24})$/).respond();
            // Run controller functionality
            scope.update();
            $httpBackend.flush();

            // Test URL location to new object
            expect($location.path()).toBe('/estimates/' + sampleEstimatePutData._id);
        }));

        it('$scope.remove() should send a DELETE request with a valid estimateId and remove the estimate from the scope', inject(function (Estimates) {
            // Create new estimate object
            var sampleEstimate = new Estimates({
                _id: '525a8422f6d0f87f0e407a33'
            });

            // Create new estimates array and include the estimate
            scope.estimates = [sampleEstimate];

            // Set expected DELETE response
            $httpBackend.expectDELETE(/estimates\/([0-9a-fA-F]{24})$/).respond(204);

            // When formdata GET happens then respond
            $httpBackend.whenGET('formdata').respond(sampleFormData);

            // Run controller functionality
            scope.remove(sampleEstimate);
            $httpBackend.flush();

            // Test array after successful delete
            expect(scope.estimates.length).toBe(0);
        }));
    });
}());
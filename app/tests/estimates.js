'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Estimate = mongoose.model('Estimate');

/**
 * Globals
 */
var user, estimate;

/**
 * Unit tests
 */
describe('Estimate Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      estimate = new Estimate({
        application: 'Application 1',
        created: '2014-04-17T04:56:35.086Z',
        description: 'estimate description',
        environment: 'Environment C',
        type: 'Update',
        user: user,
        infrastructures: [{
          cost: 1000,
          department: 'Department 4',
          description: 'infrastructure1 description',
          estimate: 10,
          estimator: 'infrastructure1 estimator',
          notes: 'infrastructure1 notes...'}
        ],
        resources: [{
          department: 'Department 1',
          description: 'resource1 description',
          estimate: 15,
          estimator: 'resource1 estimator',
          notes: 'resource1 notes...'
        }]
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return estimate.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without description', function(done) {
      estimate.description = '';

      return estimate.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Estimate.remove().exec();
    User.remove().exec();
    done();
  });
});
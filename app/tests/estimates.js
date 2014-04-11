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
        application: 'Estimate Application',
        description: 'Estimate Description',
        environment: 'Estimate Environment',
        user: user
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

      return Estimate.save(function(err) {
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
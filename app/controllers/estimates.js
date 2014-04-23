'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Estimate = mongoose.model('Estimate'),
  _ = require('lodash'),
  fs = require('fs');

/**
 * Create a Estimate
 */
exports.create = function (req, res) {
  var estimate = new Estimate(req.body);
  estimate.user = req.user;

  estimate.save(function (err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        estimate: estimate
      });
    } else {
      res.jsonp(estimate);
    }
  });
};

/**
 * Show the current Estimate
 */
exports.read = function (req, res) {
  res.jsonp(req.estimate);
};

/**
 * Update a Estimate
 */
exports.update = function (req, res) {
  var estimate = req.estimate;

  estimate = _.extend(estimate, req.body);

  estimate.save(function (err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(estimate);
    }
  });
};

/**
 * Delete an Estimate
 */
exports.delete = function (req, res) {
  var estimate = req.estimate;

  estimate.remove(function (err) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(estimate);
    }
  });
};

/**
 * List of Estimates
 */
exports.list = function (req, res) {
  Estimate.find().sort('-created').populate('user', 'displayName').exec(function (err, estimates) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(estimates);
    }
  });
};

/**
 * Estimate middleware
 */
exports.estimateByID = function (req, res, next, id) {
  Estimate.findById(id).populate('user', 'displayName').exec(function (err, estimate) {
    if (err) return next(err);
    if (!estimate) return next(new Error('Failed to load Estimate ' + id));
    req.estimate = estimate;
    next();
  });
};

/**
 * Estimate authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
  if (req.estimate.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};

/**
 * Get form data from local store or default to project template
 */
function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

// looks for environment variable, if missing, uses default file within project
var envFormDataLocation = process.env.ENV_FORM_DATA || './data/formData.json';

exports.getFormData = function (req, res) {
  readJSONFile(envFormDataLocation, function (err, json) {
    if (err) {
      res.render('500', {
        status: 500
      });
    } else {
      res.jsonp(json);
    }
  });
};
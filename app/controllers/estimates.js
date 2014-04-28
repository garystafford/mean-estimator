'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Estimate = mongoose.model('Estimate'),
  _ = require('lodash'),
  fs = require('fs'),
  formDataJSON = require('../../app/data/formData.json');

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
 * Read from JSON file
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

/**
 * Read JSON form data from one of two possible sources
 */
exports.getFormData = function (req, res) {
  // If env var does not exist read default file data
  if (!process.env.ENV_FORM_DATA) {
    res.jsonp(formDataJSON);
    return
  }

  // Else read the env var file path
  readJSONFile(process.env.ENV_FORM_DATA, function (err, json) {
    if (err) {
      console.log(err);
      return res.send(500, 'Form data could not be loaded');
    } else {
      res.jsonp(json);
    }
  });
}

/**
 * Summary of resource estimates (hours)
 */
exports.getResourceEstimates = function (req, res) {
  var pipeline = [];
  pipeline.push(
    { $unwind: '$resources' },
    {
      $project: {
        application: '$application',
        environment: '$environment',
        estimate: '$resources.estimate'
      }
    },
    {
      $group: {
        _id: {
          application: '$application',
          environment: '$environment'
        },
        sum: { $sum: '$estimate' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  );

  Estimate.aggregate(pipeline).exec(function (err, estimates) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(estimates);
    }
  });
}

/**
 * Summary of infrastructure estimates (hours) and costs ($)
 */
exports.getInfrastructureEstimates = function (req, res) {
  var pipeline = [];
  pipeline.push(
    { $unwind: "$infrastructures" },
    {
      $project: {
        application: "$application",
        environment: "$environment",
        estimate: "$infrastructures.estimate",
        cost: "$infrastructures.cost"
      }
    },
    {
      $group: {
        _id: {
          application: "$application",
          environment: "$environment"
        },
        sumEstimate: { $sum: "$estimate" },
        sumCost: { $sum: "$cost" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  );

  Estimate.aggregate(pipeline).exec(function (err, estimates) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(estimates);
    }
  });

  var getReportData = function (pipeline, promise) {
    var getReportData = function (pipeline, promise) {
      Estimate.aggregate(pipeline).exec(function (err, estimates) {
        if (err) {
          res.render('error', {
            status: 500
          });
        } else {
          res.jsonp(estimates);
        }
      });
    }
  };
}


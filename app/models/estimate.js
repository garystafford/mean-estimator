'use strict';


var ResourceSchema = {};
var InfrastructureSchema = {};

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Estimate Schema
 */
var EstimateSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  application: {
    type: String,
    default: '',
    trim: true,
    required: 'Application cannot be blank'
  },
  environment: {
    type: String,
    default: '',
    trim: true,
    required: 'Environment cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  type: {
    type: String,
    default: '',
    trim: true,
    required: 'Type cannot be blank'
  },
  resources: [ResourceSchema],
  infrastructure: [InfrastructureSchema]
});

/**
 * Resource Schema
 */
ResourceSchema = new Schema({
  department: {
    type: String,
    default: '',
    trim: true,
    required: 'Department cannot be blank'
  },
  estimator: {
    type: String,
    default: '',
    trim: true,
    required: 'Estimator cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  estimate: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Estimate cannot be blank'
  },
  notes: {
    type: String,
    default: '',
    trim: true
  }
});

/**
 * Infrastructure Schema
 */
InfrastructureSchema = new Schema({
  department: {
    type: String,
    default: '',
    trim: true,
    required: 'Department cannot be blank'
  },
  estimator: {
    type: String,
    default: '',
    trim: true,
    required: 'Estimator cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  estimate: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Estimate cannot be blank'
  },
  cost: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Cost cannot be blank'
  },
  notes: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Estimate', EstimateSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Resource = require('../models/resource');
var Infrastructure = require('../models/infrastructure');

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
  resources: [Resource.schema],
  infrastructures: [Infrastructure.schema]
});

mongoose.model('Estimate', EstimateSchema);
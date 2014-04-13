'use strict';


var ResourceSchema = {};

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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

mongoose.model('Resource', ResourceSchema);
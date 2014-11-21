'use strict';

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  app: {
    title: 'Environment Application Estimator',
    keywords: 'MEAN.JS, mongodb, express, angularjs, node.js, mongoose, passport',
    description: 'Provides a platform for the collection of estimates for adding, ' +
    'updating, and removing application platforms in development and test environments.'
  },
  root: rootPath,
  port: process.env.NODE_PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  envFormData: process.env.ENV_FORM_DATA || './modules/estimates/data/formData.json'
};
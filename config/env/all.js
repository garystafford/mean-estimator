'use strict';

var path = require('path'),
  rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  app: {
    title: 'Environment Application Estimator',
    description: 'Provides a platform for the collection of estimates for adding, updating, and removing application platforms in development and test environments.',
    keywords: 'MEAN.JS, mongodb, express, angularjs, node.js, mongoose, passport'
  },
  root: rootPath,
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions'
};
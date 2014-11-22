'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
estimates = require('../../app/controllers/estimates');

module.exports = function (app) {
    // Estimate Routes
    app.get('/estimates', estimates.list);
    app.post('/estimates', users.requiresLogin, estimates.create);
    app.get('/estimates/:estimateId', estimates.read);
    app.put('/estimates/:estimateId', users.requiresLogin, estimates.hasAuthorization, estimates.update);
    app.delete('/estimates/:estimateId', users.requiresLogin, estimates.hasAuthorization, estimates.delete);

    // Form Data Route
    app.get('/formdata', estimates.getFormData);

    // Reporting Routes
    app.get('/reporting/resources', estimates.getResourceEstimates);
    app.get('/reporting/infrastructure', estimates.getInfrastructureEstimates);

    // Finish by binding the estimate middleware
    app.param('estimateId', estimates.estimateByID);
};
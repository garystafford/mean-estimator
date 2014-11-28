'use strict';

/**
 * Module dependencies.
 */
var mongoose   = require('mongoose'),
Schema         = mongoose.Schema,
Resource       = require('./resource'),
Infrastructure = require('./infrastructure');

/**
 * Estimate Schema
 */
var EstimateSchema = new Schema({
    created        : {
        type   : Date,
        default: Date.now
    },
    user           : {
        type: Schema.ObjectId,
        ref : 'User'
    },
    application    : {
        type    : String,
        default : '',
        trim    : true,
        required: 'Application cannot be blank'
    },
    environment    : {
        type    : String,
        default : '',
        trim    : true,
        required: 'Environment cannot be blank'
    },
    description    : {
        type    : String,
        default : '',
        trim    : true,
        required: 'Description cannot be blank'
    },
    type           : {
        type    : String,
        default : '',
        trim    : true,
        required: 'Type cannot be blank'
    },
    resources      : [mongoose.model('Resource').schema],
    infrastructures: [mongoose.model('Infrastructure').schema]
});

mongoose.model('Estimate', EstimateSchema);
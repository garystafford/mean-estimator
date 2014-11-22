'use strict';


var InfrastructureSchema = {};

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema       = mongoose.Schema;

/**
 * Infrastructure Schema
 */
InfrastructureSchema = new Schema({
    department : {
        type    : String,
        default : '',
        trim    : true,
        required: 'Department cannot be blank'
    },
    estimator  : {
        type    : String,
        default : '',
        trim    : true,
        required: 'Estimator cannot be blank'
    },
    description: {
        type    : String,
        default : '',
        trim    : true,
        required: 'Description cannot be blank'
    },
    estimate   : {
        type    : Number,
        default : 0,
        trim    : true,
        required: 'Estimate cannot be blank'
    },
    cost       : {
        type    : Number,
        default : 0,
        trim    : true,
        required: 'Cost cannot be blank'
    },
    notes      : {
        type   : String,
        default: '',
        trim   : true
    }
});

mongoose.model('Infrastructure', InfrastructureSchema);
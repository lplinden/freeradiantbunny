/**
 * Module Entities.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Entities() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("standards-entities instantiated", instanceCount);
}

module.exports = new Entities();

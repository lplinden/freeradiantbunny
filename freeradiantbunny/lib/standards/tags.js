/**
 * Module Tags.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Tags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("standards-tags instantiated", instanceCount);
}

module.exports = new Tags();

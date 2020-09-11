/**
 * Module entities.
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Entities() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("entities instantiated", instanceCount);
}

module.exports = new Entities();

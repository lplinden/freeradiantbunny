/**
 * Module tags.
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Tags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tags instantiated", instanceCount);
}

module.exports = new Tags();

'use strict';

var createIndex = require("./indexing.js");
var writeHTML = require("./write.js");

exports = module.exports;

/**
 * @exports init() initialize and configure mjam assets
 * @see indexing.js
 * @see write.js
 */

/** @const */
exports.init = function(src, dest){
    var meta_data = createIndex(src);

    writeHTML(meta_data);
}
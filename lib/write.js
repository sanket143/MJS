/**
 * @fileoverview  writes .html files
 * uses meta_data from indexing.js
 * 
 * @see indexing.js
 */

'use strict'

var ejs = require("ejs");

/**
 * @param {Object=} meta_data details of blog post and file
 * @const
 */
module.exports = function(meta_data){
    for(var i in meta_data){
        ejs.renderFile("./template.ejs", meta_data[i], function(err, str){
            if(err){
                console.log(err);
            } else {
                console.log(str);
            }
        });
    }
}
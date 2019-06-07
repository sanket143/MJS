'use strict';

var createIndex = require("./indexing.js");
var config = {};

exports = module.exports;

exports.init = function(src, dest){
    config.src = src;
    config.dest = dest;
    var meta_data = createIndex(src);
    console.log(meta_data);
}

exports.info = function(){
    return config;
}

exports.sayHello = function(){
    console.log("Hello World");
}
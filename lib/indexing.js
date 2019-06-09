'use strict'

/**
 * @fileoverview creates index of .mj files
 */

var fs = require("fs");
var path = require("path");

/**
 * @param {string} src is a relative directory path to .mj files
 * @returns {meta_data} is an array; contains information of
 *  all tracked .mj files
 */

module.exports = function(src){
    var location = path.join(".", src);
    var files = fs.readdirSync(location);

    var meta_data = [];
    var index_data = [];

    for(var i = 0; i < files.length; i++){
        if(files[i].slice(-3, files[i].length) == ".mj"){
            var file_path = path.join(location, files[i]);
            var file_content = fs.readFileSync(file_path, { encoding: 'utf8' });

            var re_title = /title:(.*?);/i;
            var re_date = /date:(.*?);/i;
            var re_time = /time:(.*?);/i;
            var re_keywords = /keywords:(.*?);/i;
            var re_content = /(---)([\s\S]*)(---)/mi;

            var title = file_content.match(re_title, "$1")[1].replace(/^\s+|\s+$/g, "");
            var date = file_content.match(re_date, "$1")[1].replace(/^\s+|\s+$/g, "");
            var time = file_content.match(re_time, "$1")[1].replace(/^\s+|\s+$/g, "");
            var content = file_content.match(re_content)[2].replace(/^\s+|\s+$/g, "");
            var keywords = file_content.match(re_keywords, "$1")[1].split(",");

            keywords = keywords.map(function(item){
                return item.replace(/^\s+|\s+$/g, "");
            });

            var data = {
                file: files[i],
                title: title,
                date: date,
                time: time,
                keywords: keywords,
            }

            index_data.push(data);

            data = JSON.parse(JSON.stringify(data));
            data.content = content;
            meta_data.push(data);
        }
    }

    fs.writeFile(path.join(location, "index.mj.json"), JSON.stringify(index_data), function(err){
        if(err){
            return console.log(err);
        }

        console.log("index.mj.json is successfully created.");
    });

    return meta_data;
}
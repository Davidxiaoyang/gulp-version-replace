/**
 * Created by Administrator on 2016/7/15 0015.
 */
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var map = require('event-stream').map;
var pattern = /(?:href=|src=|url\()['|"]([^\s>"']+?)\?rev=([^\s>"']+?)['|"]/gi;

var repVPlugin = function(obj){
    obj = obj || {};
    pattern = obj.regExp || pattern;

    return map(function(file,cb){
        var contents,
            lines,
            line,
            groups,
            hash;

        if(!file){
            throw new PluginError('gulp-version-replace', 'Missing file option for gulp-version-replace.');
        }
        if(!file.contents) {
            throw new PluginError('gulp-version-replace', 'Missing file.contents required for modifying files using gulp-version-replace.');
        }

        contents = file.contents.toString();
        lines = contents.split('\n');

        for(var i = 0,len = lines.length;i<len;i++){
            line = lines[i];
            groups = pattern.exec(line);
            if (groups && groups.length > 1) {
                try{
                    hash = crypto.createHash('md5');
                    hash.update(contents.toString(), 'utf8');
                    line = line.replace(groups[2], hash.digest('hex'));
                }catch(e){

                }
            }
            lines[i] = line;
            pattern.lastIndex = 0;
        }
        file.contents = new Buffer(lines.join('\n'));
        cb(null, file);
    });
}


module.exports = repVPlugin;
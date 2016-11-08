var through = require("through2"),
    gutil = require("gulp-util"),
    RnCssJs = require('rn-css-js'),
    path = require('path');

var ext = gutil.replaceExtension;

var PLUGIN_NAME = 'gulp-sass';

module.exports = function (options) {
    "use strict";
    options = options || {};

    function reactNativeCss(file, enc, callback) {
        /*jshint validthis:true*/
        // Do nothing if no contents
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            // accepting streams is optional
            this.emit("error",
                new gutil.PluginError(PLUGIN_NAME, "Stream content is not supported"));
            return callback();
        }

        var cssOpera = new RnCssJs();
        var errorM = function errorM(error) {
            var relativePath = '',
                filePath = error.file === 'stdin' ? file.path : error.file,
                message = '';

            filePath = filePath ? filePath : file.path;
            relativePath = path.relative(process.cwd(), filePath);

            message += gutil.colors.underline(relativePath) + '\n';
            message += error.formatted;

            error.messageFormatted = message;
            error.messageOriginal = error.message;
            error.message = gutil.colors.stripColor(message);

            error.relativePath = relativePath;

            return callback(new gutil.PluginError(
                PLUGIN_NAME, error
            ));
        };
        try {
            var cssresult = cssOpera.parse(Object.assign({
                inputPut: file.path,
            }, options));

            file.contents = new Buffer(cssresult);
            file.path = ext(file.path, '.js');
            this.push(file);
        }catch (e){
            return errorM(e)
        }

        return callback();
    }

    return through.obj(reactNativeCss);
};

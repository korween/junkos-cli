var fs = require('fs')

module.exports = function(require) {
    require.uncache = function () {
        var files = fs.readdirSync('./code/');
        for(var file in files) {
            var moduleName='./code/'+files[file];
            require.searchCache(moduleName, function (mod) {
                delete require.cache[mod.id];
            });
            Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
                if (cacheKey.indexOf(moduleName)>0) {
                    delete module.constructor._pathCache[cacheKey];
                }
            });
        }
    };

    require.searchCache = function (moduleName, callback) {
        var mod = require.resolve(moduleName);
        if (mod && ((mod = require.cache[mod]) !== undefined)) {
            (function run(mod) {
                mod.children.forEach(function (child) {
                    run(child);
                });
                callback(mod);
            })(mod);
        }
    }
}
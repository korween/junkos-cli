var fs = require('fs')

module.exports=function(input, scope) {
    var files = fs.readdirSync('./code/');
    return files;
}

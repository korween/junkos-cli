var fs = require('fs')

module.exports=function(input, scope) {
    var files = fs.readdirSync('./code/');
    scope.print('Junk');
    return files;
}

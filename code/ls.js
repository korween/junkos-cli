var fs = require('fs')

module.exports=function(input, scope) {
    var files = fs.readdirSync('./code/');
    scope.error('Junk');
    scope.print('Lol');
    return files;
}

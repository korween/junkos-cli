var fs = require('fs')

module.exports=function(input) {
    var files = fs.readdirSync('./code/');
    return files;
}
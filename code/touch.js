var fs = require('fs');

module.exports=function(input) {
    if(!input)
        return "Please specify file name"
    var args=input['_args'];
    if (args) {
        var res = fs.writeFileSync("./code/" + args[0] + '.js', "");
        return "OK"
    }
    return "Please specify a filename"
}
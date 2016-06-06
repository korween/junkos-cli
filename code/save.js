var fs = require('fs');

module.exports=function(input) {
    if(!input)
        return "Invalid data"
    if (input['_file'] && input['_body']) {
        var res = fs.writeFileSync("./code/" + input['_file'] + '.js', input['_body']);
        return "OK"
    }

}

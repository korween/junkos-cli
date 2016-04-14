var fs = require('fs');

module.exports=function(input) {
    if(!input) {
        return 'Please specify file to edit'
    }
    var args=input['_args'];
    if(!args)
        return "Please specify a file";
    var removed=0;
    var failed=0;
    for (var arg in args) {
        try {
            fs.unlinkSync('./code/'+args[arg]+'.js');
            removed++;
        }
        catch(err) {
            failed++;
        }
    }
    return "Removed: "+removed.toString()+" files<br> \
           Failed: "+failed.toString()+" files<br> \
           Total: "+(failed+removed).toString()+" files";
}
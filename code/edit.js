var fs=require('fs');

module.exports=function(input) {
    if(!input) {
        return 'Please specify file to edit'
    }
    var args=input['_args'];
    if(!args)
        return "Please specify a file";
    try {
        var body = fs.readFileSync('./code/'+args[0]+'.js','utf8');
    }
    catch(err) {
        fs.writeFileSync("./code/" + args[0] + '.js', "");
        var body = fs.readFileSync('./code/'+args[0]+'.js','utf8');
    }
    return {
        '_editor':true,
        '_body':body,
        '_file':args[0]
    };
}

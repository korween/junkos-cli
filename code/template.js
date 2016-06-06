var fs = require('fs');

var bootText="module.exports=function(input, s) {\n// Insert code here \n}"

module.exports=function(input) {
	if(!input)
		return "Please specify file name"
	var args=input['_args'];
 	try {
	        fs.readFileSync('./code/'+args[0]+'.js','utf8');
		return;
	}
	catch(err) {
		if (args) {
        		var res = fs.writeFileSync("./code/" + args[0] + '.js', bootText);
        	return "OK"
    		}
	}
 	return "Please specify a filename"
}

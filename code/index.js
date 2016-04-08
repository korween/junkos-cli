var fs=require('fs');

module.exports=function() {
    var funcs = {}
    var files = fs.readdirSync('./code/')
    for (var i=0; i<files.length; i++) {
        if(files[i]=='index.js') {

        }
        else {
            funcs[files[i].split('.js')[0]]=require('./'+files[i]);
        }
    }
    return funcs;
}

fs = require('fs');

module.exports = function() {
    var files= {
        "socket.io.js": "./node_modules/socket.io-client/socket.io.js",
        "jquery.min.js": "./node_modules/jquery/dist/jquery.min.js"
    }

    try {
        for (var f in files) {
            fs.writeFileSync('./client/'+f, fs.readFileSync(files[f]));
        }
    }
    catch(err) {
        console.log('Some required files are not found. Please make sure you have ran \'npm install\' first');
        process.exit(1);
    }
}




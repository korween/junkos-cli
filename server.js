require('./mod/require-uncache')(require);
require('./mod/copy-modules')();
var express = require('express');
var redis = {
    ready: false,
    client: require('redis').createClient(),
    api : null
}
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket;
var print;
var fs = require('fs');
var codeChunks={}
var commands = [];
var scope = {
    print : require('./mod/print').print,
    error : require('./mod/print').error
};

redis.client.on('connect', function() {
    redis.ready = true;
    redis.api = require('./mod/redis')(redis);
    scope.store = redis.api.setKey;
    scope.fetch = redis.api.getKey;
});



function init(uncache) {
    if(uncache)
        require.uncache();
    codeChunks = require("./code/index.js")();
    var status={}
    var i = 0;
    for (var chunk in codeChunks) {
        i++;
        try {
            codeChunks[chunk](null, scope);
        }
        catch(err) {
            delete codeChunks[chunk];
            status[chunk]='>> ERROR: '+err;
        }
    }
    commands=[];
    for (var c in codeChunks) {
        commands.push(c);
        status[c]="OK"
    }
    return status;
}

init();


for (var c in codeChunks) {
    commands.push(c);
}

app.use(express.static('client'));

io.on('connection', function(s){
    socket = s;
    socket.on('disconnect', function(){
    });
    socket.on('inputEnter', function(string){
        var res =runCommand(string);
        io.emit('outputEnter', res);
    });
    socket.on('inputTab', function(string){
        var res = tabFind(string, commands)
        io.emit('outputTab', res);
    });
    require('./mod/print').bind(socket, io);
});

// Random crash
var random = Math.floor(Math.random() * 2);
var noCrash = process.argv.filter(function noCrash(arg){
    return arg === '--no-crash';
});
if (random || noCrash.length){
    var port = 3000;
    http.listen(port, function(){
        console.log('Junk OS CLI started on port ' + port);
    });
} else {
    console.error('Junk OS CLI has crashed !');
}

function runCommand(input) {
    var command = input['_command'];
    var cmd=command.split(' ');
    var c = cmd[0];
    cmd.shift();
    input['_command']=c;
    input['_args']=cmd;
    if(commands.indexOf(c)>-1) {
        return codeChunks[c](input, scope);
    }
    else if(c=="reload") {
        res = init(true);
        return res;
    }
    return 'Command '+c+' not found'
}


// Inefficient as hell
function tabFind(key, array) {
    var results = [];
    var re = new RegExp('^'+key);
    for (var i = 0; i < array.length; i++) {
        if (array[i].match(re)) {
            results.push(array[i]);
        }
    }
    return results;
}

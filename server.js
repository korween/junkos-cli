require('./mod/require-uncache')(require);
require('./mod/copy-modules')();
var express = require('express');
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

http.listen(3000, function(){
    console.log('listening on *:3000');
});

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

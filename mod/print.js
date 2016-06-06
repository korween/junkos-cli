var socket;
var io;
module.exports = {
    print : print,
    bind : bind
};

function print(input){
    if(socket.connected){
        io.emit('display',{
            body : input.toString(),
            empty : !!input
        });
    }
}

function bind(s, i){
    socket = s;
    io     = i;
}

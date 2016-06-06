var socket;
var io;
module.exports = {
    print : print,
    error : error,
    bind : bind
};

function print(input, empty){
    if(socket.connected){
        io.emit('display',{
            body : input.toString(),
            empty : !!empty
        });
    }
}

function error(input, empty){
    if(socket.connected){
        io.emit('error',{
            body : input.toString(),
            empty : !!empty
        });
    }
}

function bind(s, i){
    socket = s;
    io     = i;
}

var socket;
var io;
module.exports = {
    print : print,
    error : error,
    bind : bind
};

function print(input, empty, color){
    if(socket.connected){
        io.emit('display',{
            body : input.toString(),
            empty : !!empty,
            color: color || null
        });
    }
}

function error(input, empty){
    if(socket.connected){
        io.emit('display',{
            body : input.toString(),
            empty : !!empty,
            color : '#FF2301'
        });
    }
}

function bind(s, i){
    socket = s;
    io     = i;
}

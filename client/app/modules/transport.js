/* Transport module
 * Description: Handles socket.io related interactions
 *
 * */


function Transport(socket) {
    this.socket =  io();
    return {
        "socket": this.socket,
        "send": send,
        "bind": bind
    }

    function send(cmd, consoleInput, textareaInput) {
        var input;
        if(cmd)
            input = {'_command': cmd};
        else
            input = {'_command': consoleInput};
        if(textareaInput)
            input['_body'] = textareaInput;
        if(editFile) {
            input['_file']=editFile;
            editFile=null;
        }
        this.socket.emit('inputEnter', input);
    }

    function bind(event,cb) {
        this.socket.on(event,cb);
    }
}
/* Action module
 * Description: High level wrapper for handling front-end interaction
 *
 * */

var Action = function() {
    return {
        "cmd": sendCommand
    };

    function sendCommand(cmd) {
        var transport = window.transport || null;
        if(!transport) return;
        var c = $('#console');
        var editor = $('#edit');
        transport.send(cmd,c.val(),editor.val());
        editor.val('');
        $('#editor').hide();
        $('#output').show();
        c.val("").focus();
    }
}
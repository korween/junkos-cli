var socket = io();
var commands = [];
var autoCompleteIndex=0;
var lastChar=null;
var editFile=null;

$( document ).ready(function() {
    $("#editor").hide();
    $("#console").attr('disabled',true);


    socket.on('disconnect',function() {
        $("#console").attr('disabled',true);
        $("#console").attr('placeholder','No connection');
    });

    socket.on('connect',function() {
        $("#console").attr('disabled',false);
        $("#console").attr('placeholder','type...');
    });



    $("#editor").on('keydown',function(e) {
        if(e.which==83 && e.ctrlKey) {
            sendCommand('save');
            e.preventDefault()
        }
    })
    $("#console").on('keydown',function(e) {
        if (e.which == 9) {
            e.preventDefault();
            var input=$('#console').val();
            if(commands.length==0) {
                socket.emit('inputTab', input);
                lastChar = e.which;
                return true;
            }
            if(lastChar == 9) {
                if (autoCompleteIndex++ > commands.length-2)
                    autoCompleteIndex = 0;
                $("#console").val(commands[autoCompleteIndex]);
            }
            else {
                var r = tabFind(input, commands);
                if (r.length == 0) {
                    socket.emit('inputTab', input);
                    lastChar = e.which;
                    return true;
                }
                else {
                    r = commands;
                    autoCompleteIndex = 0;
                }
            }
        }
        else if (e.which == 13) {
            sendCommand();
        }
        else {

        }
        lastChar = e.which;
        return true;
    });
});


socket.on('outputTab', function(c){
    if(c) {
        commands=c;
    }
});

socket.on('outputEnter', function(c){
    if(c) {
        var res = "";
        if(c instanceof Array) {
            res=c.join("<br>");
        }
        else if(c instanceof Object) {
            if(c['_editor']) {
                editFile=c['_file'];
                $("#edit").val(c['_body'])
                $("#editor").show();
                $("#edit").focus();
                $('#output').hide();
                //process editor
            }
            else {
                for (item in c) {
                    res+=item+" "+c[item]+"<br>";
                }
            }
        }
        else
            res = c;
        $('#output').empty().append(res);
    }
});

function sendCommand(cmd) {
    if(cmd) {
        var input = {'_command': cmd}
    }
    else {
        var input = {'_command': $('#console').val()}
    }
    if ($('#edit').val()) {
        input['_body']=$('#edit').val();
        $('#edit').val('');
        $('#editor').hide();
        $('#output').show();
    }
    if(editFile) {
        input['_file']=editFile;
        editFile=null;
    }
    socket.emit('inputEnter', input);
    $("#console").val("").focus();
}

// Inefficient as hell: client version
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
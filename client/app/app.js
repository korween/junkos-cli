var editFile=null;
var transport = new Transport();

$( document ).ready(function() {
    var input = new Input();
    var konsol = $("#console");
    var editor = $("#edit");
    $("#editor").hide();
    konsol.attr('disabled',true);
    konsol.attr('placeholder','No connection');

    transport.bind('disconnect',function() {
        konsol.attr('disabled',true);
        konsol.attr('placeholder','No connection');
    });

    transport.bind('connect',function() {
        konsol.attr('disabled',false);
        konsol.attr('placeholder','type something');
    });

    transport.bind('outputTab', function(c){
        if(c && window.commands)
            window.commands=c;
    });

    transport.bind('display', function(c) {
        if (c && c.body) {
            var out = $('#logger')
            if (c.empty)
                out.empty()
            out.append(c.body+'\n');
        }
    })

    transport.bind('error', function(c) {
        if (c && c.body) {
            var out = $('#logger').css({"color":"#FF2301"})
            if (c.empty)
                out.empty()
            out.append(c.body+'\n');
        }
    })

    transport.bind('outputEnter', function(c){
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
                    for (var item in c) {
                        res+=item+" "+c[item]+"<br>";
                    }
                }
            }
            else
                res = c;
            $('#output').empty().append(res);
        }
    });

    konsol.on("keydown",function(e) {
        input.console.handleKey(e,konsol);
    });

    editor.on("keydown",function(e) {
        input.editor.handleKey(e,editor);
    });
});




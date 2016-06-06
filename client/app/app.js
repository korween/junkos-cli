var editFile=null;
var transport = new Transport();

$( document ).ready(function() {
    var input = new Input();
    var console = $("#console");
    var editor = $("#edit");
    $("#editor").hide();
    console.attr('disabled',true);
    console.attr('placeholder','No connection');

    transport.bind('disconnect',function() {
        console.attr('disabled',true);
        console.attr('placeholder','No connection');
    });

    transport.bind('connect',function() {
        console.attr('disabled',false);
        console.attr('placeholder','type something');
    });

    transport.bind('outputTab', function(c){
        if(c && window.commands)
            window.commands=c;
    });

    transport.bind('display', function(c) {
        if (c && c.body) {
            var out = $('#output')
            if (c.empty)
                out.empty()
            out.append(c.body);
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

    console.on("keydown",function(e) {
        input.console.handleKey(e,console);
    });

    editor.on("keydown",function(e) {
        input.editor.handleKey(e,editor);
    });
});




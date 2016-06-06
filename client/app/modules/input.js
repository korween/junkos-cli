/* Input module
* Description: Handles user input in text input box and textarea
*
* */

var commands=[];
var autoCompleteIndex=0;
var lastChar=null;

new function($) {
    $.fn.getCursorPosition = function () {
        var el = $(this).get(0);
        var pos = 0;
        if ('selectionStart' in el) {
            pos = el.selectionStart;
        } else if ('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }

    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };
}(jQuery);


// Textarea input processing
$( document ).ready(function() {
    $("#editor").on('keydown',function(e) {

    })
});

function Input() {

    return {
        'editor': {
            'handleKey': onKeypressEditor
        },
        'console': {
            'handleKey': onKeypressConsole
        }
    };

    function onKeypressEditor(e, editor) {
        var action = new Action();
        var position = editor.getCursorPosition();
        var content = editor.val();
        var newContent;
        // Save
        if(e.which==83 && e.ctrlKey) { // CTRl + S
            action.cmd('save');
            e.preventDefault()
        }
        // Tab
        if(e.which==9) {
            e.preventDefault()
            newContent = content.substr(0, position) + "    " + content.substr(position);
            editor.val(newContent);
            editor.setCursorPosition(position+4);
        }
        // Tab delete
        if(e.which==8) {
            if (content.substr(position-4, 4) == "    ") {
                e.preventDefault();
                newContent = content.substr(0, position-4) + content.substr(position);
                editor.val(newContent);
                editor.setCursorPosition(position-4);
            }
        }
        return;
    }

    function onKeypressConsole(e, konsole) {
        var transport = window.transport || null;
        if(!transport) return;
        var action = new Action();
        var utility = new Utility()

        if (e.which == 9) {
            e.preventDefault();
            var input=konsole.val();
            if(commands.length==0) {
                transport.socket.emit('inputTab', input);
                lastChar = e.which;
                return true;
            }
            if(lastChar == 9) {
                if (autoCompleteIndex++ > commands.length-2)
                    autoCompleteIndex = 0;
                konsole.val(commands[autoCompleteIndex] + " ");
            }
            else {
                var r = utility.tabFind(input, commands);
                if (r.length == 0) {
                    transport.socket.emit('inputTab', input);
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
            action.cmd();
        }
        else {}
        lastChar = e.which;
        return true;
    }
}
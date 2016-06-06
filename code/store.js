module.exports=function(input, s) {
    if(!input) {
        return "Usage: store [key] [value]";
    }
    var args=input['_args'];
    if(!args || args.length<2)
        return "No key/value specified"
    s.store(args[0],args[1], function(e,d) {
        s.fetch(args[0], function(e, d) {
            s.print("var "+ args[0]+" = "+d, false, 'green')
        });
    });
}
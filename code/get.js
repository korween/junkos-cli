module.exports=function(input, s) {
    if(!input)
        return
    var args = input['_args'];
    if(args.length < 1)
        return "Usage: get [key]";
    s.fetch(args[0], function(e,d) {
        s.print("> "+d, null, 'blue');
    });
}
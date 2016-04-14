/* Utility module
 * Description: Handles misc functions
 *
 * */

function Utility() {
    return {
        "tabFind": tabFind
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
}
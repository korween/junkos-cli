module.exports = function(redis) {
    var service = {
        setKey : storeKey,
        getKey : fetchKey
    };
    return service;

    function fetchKey(key, cb) {
        redis.client.get(key, function(err, object) {
            if(err) cb(err, null)
            cb(null, object)
        });
    }

    function storeKey(key, value, cb) {
        redis.client.set(key, value, cb);
    }
}
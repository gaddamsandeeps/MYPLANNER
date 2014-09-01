/**
 * common utils.js  can be segregated later
 */
var errors = require("../../errors.json");

exports.mergeJSON = function(source1, source2) {
    /*
     * Properties from the Souce1 object will be copied to Source2 Object.
     * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
     * */
    var mergedJSON = Object.create(source2); // Copying Source2 to a new Object

    for (var attrname in source1) {
        if (mergedJSON.hasOwnProperty(attrname)) {
            if (source1[attrname] != null && source1[attrname].constructor == Object) {
                /*
                 * Recursive call if the property is an object,
                 * Iterate the object and set all properties of the inner object.
                 */
                mergedJSON[attrname] = zrd3.utils.mergeJSON(source1[attrname], mergedJSON[attrname]);
            }

        } else { //else copy the property from source1
            mergedJSON[attrname] = source1[attrname];

        }
    }

    return mergedJSON;
}

exports.handleErrors = function(obj, callback) {
    var res = new Object();

    if (obj.errno) {
        res.errno = obj.errno;
        res.code = obj.code;
        if (obj.errno === errors.sqlcode.ER_DUP_ENTRY) {
            res.message = errors.sqlerror.ER_DUP_ENTRY;
        } else {
            res.message = errors.common.error;
        }
        callback(res);
    } else {
        res.message = errors.success.common;
        callback(res);
    }
}
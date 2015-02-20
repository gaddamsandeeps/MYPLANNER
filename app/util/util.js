/**
 * common utils.js  can be segregated later
 */
var dateFormat = require("dateformat"),
    errors = require("../../errors.json"),
    format = 'yyyy-mm-dd h:MM:ss TT';

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
    res.data = new Object();

    if (obj.errno) {
        res.message = 'failure';
        res.data.errno = obj.errno;
        res.data.code = obj.code;
        if (obj.errno === errors.sqlcode.ER_DUP_ENTRY) {
            res.data.message = errors.sqlerror.ER_DUP_ENTRY;
        } else {
            res.data.message = errors.common.error;
        }
        callback(res);
    } else {
        res.message = 'success';
        res.data.message = errors.success.common;
        res.data = obj;
        callback(res);
    }
}

exports.formatDate = function(val, callback) {
    try {
        val = dateFormat(val, format);
        return val;
    } catch (e) {
        return '';
    }
}

//empty error object to pass 
exports.emptyFailureErrObj = function() {
    var res = new Object();
    res.data = new Object();

    res.message = 'failure';
    res.data.errno = '';
    res.data.code = '';
    res.data.message = "Invalid details entered.";
    return res;
}


// a and b are javascript Date objects
exports.dateDiffInDays = function(date1, date2) {    
    //Get 1 day in milliseconds
  var oneDay = 24*60*60*1000;

  var diffDays = Math.round(((date1.getTime() - date2.getTime())/(oneDay))+1);   
  
  return diffDays;     

}

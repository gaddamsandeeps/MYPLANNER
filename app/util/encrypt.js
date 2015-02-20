//can be deleted if not needed
var crypto = require('crypto'),
    shasum;


exports.encrypt = function(txt) {
    shasum = crypto.createHash('sha1');
    shasum.update(txt);
    return shasum.digest('hex');
}

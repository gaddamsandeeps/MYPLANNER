var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 9999,
    appname: "NISUMPLANNER",
    session: {
        key: "asdklghakjhsadd21721973hsa1892",
        maxAge: 1800000,
        expires: 1800000
    }
}

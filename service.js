var Service = require('node-windows').Service,
    config = require("./config.json");

// Create a new service object
var svc = new Service({
    name: 'Nisum Planner',
    description: config.common.projectName + " app is a resource management tool.",
    script: require('path').join(__dirname, 'server/server.js')
});

//svc.user.domain = 'mydomain.local';
//svc.user.account = 'username';
//svc.user.password = 'password';

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    console.log(config.common.projectName + "Tool Service installed.");
    svc.start();
});

svc.on('alreadyinstalled ', function() {
    console.log(config.common.projectName + " Tool Service already installed.");
});

svc.on('invalidinstallation ', function() {
    console.log(config.common.projectName + " Tool Service invalid installation.");
});

svc.on('uninstall ', function() {
    console.log(config.common.projectName + " Tool Service uninstalled.");
});

svc.on('start ', function() {
    console.log(config.common.projectName + " Tool Service started.");
});

svc.on('stop', function() {
    console.log(config.common.projectName + " Tool Service stopped.");
});

svc.on('error ', function() {
    console.log(config.common.projectName + " Tool Service has an error.");
});

var args = process.argv.slice(2)[0];
if (args === 'install') {
    svc.install();
} else if (args === 'uninstall') {
    svc.uninstall();
} else if (args === 'start') {
    svc.start();
} else if (args === 'stop') {
    svc.stop();
} else {
    console.log("Please pass action as argument like install/uninstall/start/stop");
}
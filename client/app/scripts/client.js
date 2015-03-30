let io = require('socket.io-client');

class Client {
    constructor(socket) {
        socket.on('userinfo', (data) => {
            this.serverInfo = data.info;

            console.log('serverInfo', this.serverInfo);
        });

        socket.on('new planet', (data) => {
            console.log('new planet', data);
            this.newPlanet(data.planet);
        });
    }
}

function connect(opts, cb) {
    opts.name = opts.name || 'Guest' + Math.floor(Math.random() * 1000000);
    opts.authToken = opts.authToken || '';
    opts.server = opts.server || {};
    opts.server.hostname = opts.server.hostname || window.location.hostname;
    opts.server.port = opts.server.port || 5050;
    opts.server.protocol = opts.server.protocol || 'http';
    opts.server.addr = opts.server.addr || opts.server.protocol + '://' + opts.server.hostname + ':' + opts.server.port;

    let socket = io.connect(opts.server.addr);

    socket.on('connect', function () {
        socket.emit('auth', {name: opts.name, authToken: opts.authToken});

        socket.on('authresult', function (data) {
            if (data.success) {
                cb(null, new Client(socket));
            } else {
                cb(data.error);
            }
        });
    });
}

function ping(cb) {

}

module.exports = {
    connect: connect,
    ping: ping
};

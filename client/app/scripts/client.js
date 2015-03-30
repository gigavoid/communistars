let io = require('socket.io-client');

class Client {
    constructor(socket) {
        socket.on('userinfo', (data) => {
            this.id = data.info.id;
            this.name = data.info.name;
            console.log('My id: ' + this.id);
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
        setStatus(true);
        socket.emit('auth', {name: opts.name, authToken: opts.authToken});

        socket.on('authresult', function (data) {
            if (data.success) {
                cb(null, new Client(socket));
            } else {
                cb(data.error);
            }
        });
    });

    socket.on('disconnect', function () {
        setStatus(false);
    });
}

function setStatus(connected) {
    let statusTxt = connected ? 'Connected' : 'Disconnected';
    console.log('Server status: ' + statusTxt);
    document.querySelector('.status').innerText = statusTxt;

    if (connected) {
        document.querySelector('.connected').style.display = 'block';
    } else {
        document.querySelector('.connected').style.display = 'none';
    }
}

function ping(cb) {

}

module.exports = {
    connect: connect,
    ping: ping
};

setStatus('Disconnected');

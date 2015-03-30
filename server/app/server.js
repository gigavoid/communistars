var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

var port = process.env.PORT || 5050;
app.listen(port);
console.log('Socket.io server listening on port ' + port);


var clients = [];
var planets = [];

function Client(id) {
    this.name = '';
    this.id = id;

    this.getUserInfo = function() {
        return {
            id: this.id,
            name: this.name
        }
    };
}

function Planet(owner, x, y, z) {
    this.owner = owner;
    this.pos = {
        x: x,
        y: y,
        z: z
    };
}

function hasPlanet(id) {
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];

        if (planet.owner === id) {
            return true;
        }
    }
    return false;
}

var id = 0;

io.on('connection', function (socket) {
    console.log('Connection');
    socket.emit('news', { hello: 'world' });
    socket.on('auth', function (data) {
        // TODO: Veryify authtoken
        socket.emit('authresult', {success: true});

        var client = new Client(id++);
        client.name = data.name;
        clients.push(client);
        console.log('Connected clients:', clients.length);
        for (var i = 0; i < planets.length; i++) {
            var planet = planets[i];

            io.emit('new planet', {planet: planet});
        }

        socket.emit('userinfo', {info: client.getUserInfo()});


        if (!hasPlanet(client.id)) {
            // Give them a starting planet
            var planet = new Planet(client.id, Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 500);
            planets.push(planet);
            io.emit('new planet', {planet: planet});
        }

    });
});

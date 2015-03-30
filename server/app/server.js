'use strict';

var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');
var Galaxy = require('./gen/galaxy');

var port = process.env.PORT || 5050;
app.listen(port);
console.log('Socket.io server listening on port ' + port);

console.log('generating');
var galaxy = new Galaxy();
console.log('done generating');

let galaxyStream = fs.createWriteStream('world.galaxy');

for (let i = 0; i < galaxy.stars.length; i++) {
    let star = galaxy.stars[i];

    // Color int (4), Size double (8), Poisiton double (8 * 3), NumPlanets int (4)
    var starBuffer = new Buffer(4 + 8 + 8 * 3 + 4);
    starBuffer.writeInt32BE(star.color);
    starBuffer.writeDoubleBE(star.size);
    starBuffer.writeDoubleBE(star.position.x);
    starBuffer.writeDoubleBE(star.position.y);
    starBuffer.writeDoubleBE(star.position.z);
    starBuffer.writeInt8(star.planets.length);
    galaxyStream.write(starBuffer);

    for (let j = 0; j < star.planets.length; j++) {
        let planet = star.planets[j];

        // Distance double (8), Size dobule (8)
        var planetBuffer = new Buffer(8 + 8);
        planetBuffer.writeDoubleBE(planet.distance);
        planetBuffer.writeDoubleBE(planet.size);
        galaxyStream.write(planetBuffer);
    }

    galaxyStream.uncork()
}

galaxyStream.end();
console.log('File writteen');




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

            socket.emit('new planet', {planet: planet});
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

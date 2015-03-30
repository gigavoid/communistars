let Engine = require('./engine'),
    Star = require('./bodys/star'),
    Input = require('./input'),
    client = require('./client'),
    stats = require('./stats'),
    Planet = require('./bodys/planet');

class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, 0, Math.pow(10, -17), 10000 );
        camera.position.z = 1000;
        super(camera);

        stats.init();

        client.connect({}, (err, client) => {
            if (err) alert('Could not connect to the server:\n' + err);

            client.newPlanet = (planet) => {
                this.scene.add(new Planet(planet.pos.x, planet.pos.y, planet.pos.z));
            }
        });

        //this.star = new Star();
        //this.scene.add(this.star);

        // create the particle variables
        var particleCount = 1800,
            particles = new THREE.Geometry(),
            pMaterial = new THREE.PointCloudMaterial({
                color: 0xFFFFFF,
                size: 20
            });

// now create the individual particles
        for (var p = 0; p < particleCount; p++) {

            // create a particle with random
            // position values, -250 -> 250
            var pX = Math.random() * 500 - 250,
                pY = Math.random() * 500 - 250,
                pZ = Math.random() * 500 - 250,
                particle = new THREE.Vector3(pX, pY, pZ)

            // add it to the geometry
            particles.vertices.push(particle);
        }

// create the particle system
        var pointCloud = new THREE.PointCloud(
            particles,
            pMaterial);

// add it to the scene
        this.scene.add(pointCloud);

        this.star = new Star();
        this.scene.add(this.star);

        this.input = new Input();
    }

    update(dt) {
        stats.begin();
        this.input.updateCamera(this.camera, dt);
        stats.end();
    }
}

let game = new Game();
game.start();

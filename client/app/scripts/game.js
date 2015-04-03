let Engine = require('./engine'),
    Star = require('./bodys/star'),
    Input = require('./input'),
    client = require('./client'),
    stats = require('./stats'),
    Planet = require('./bodys/planet'),
    Galaxy = require('../../../shared/lib/gen/galaxy');

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

        this.galaxy = new Galaxy(1337);
        this.galaxy.generateGalaxy();

        let particles = new THREE.Geometry(),
            pMaterial = new THREE.PointCloudMaterial({
                map: THREE.ImageUtils.loadTexture(
                    "/static/images/particle.png"
                ),
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        for (var p = 0; p < this.galaxy.stars.length; p++) {
            var pX = this.galaxy.stars[p].position.x,
                pY = this.galaxy.stars[p].position.y,
                pZ = this.galaxy.stars[p].position.z,
                particle = new THREE.Vertex(
                    new THREE.Vector3(pX, pY, pZ)
                );
                particle.color = this.galaxy.stars[p].color;
            particles.vertices.push(particle);
        }

        var pointCloud = new THREE.PointCloud(
            particles,
            pMaterial);

        this.scene.add(pointCloud);

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

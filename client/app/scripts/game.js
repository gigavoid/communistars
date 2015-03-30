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

        // kan vara viktigt
        /*particles = new THREE.Geometry(),
            pMaterial = new THREE.PointCloudMaterial({
                map: THREE.ImageUtils.loadTexture(
                    "/static/images/particle.png"
                ),
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        var pointCloud = new THREE.PointCloud(
            particles,
            pMaterial);

        this.scene.add(pointCloud);*/

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

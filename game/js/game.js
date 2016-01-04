let Engine = require('./engine'),
    GalaxyGen = require('./gen/galaxyGen'),
    Input = require('./input'),
    stats = require('./stats'),
    THREE = require('three'),
    particleImg = require('../static/images/particle.png');

class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, 0, Math.pow(10, -17), 10000 );
        camera.position.z = 1000;
        super(camera);

        stats.init();

        let stars = 3000000;

        let galaxyGen = new GalaxyGen(stars);
        //Math.acos(Math.pow(r1, 2)) * r * ((angle + r2 - 0.5) % (Math.PI * armLength))

        // create the particle variables
        var particles = new THREE.Geometry(),
        pMaterial = new THREE.PointsMaterial({
            map: THREE.ImageUtils.loadTexture(particleImg),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        for (var p = 0; p < stars; p++) {
            var star = galaxyGen.getStarArray()[p];
            var particle = star.position;
            particles.vertices.push(particle);
        }

        var points = new THREE.Points(
            particles,
            pMaterial);

        points.computeBoundingSphere();

        this.scene.add(points);

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

let Engine = require('./engine'),
    GalaxyGen = require('./gen/galaxyGen'),
    Star = require('./bodys/star'),
    Input = require('./input'),
    stats = require('./stats'),
    Planet = require('./bodys/planet');

class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, 0, Math.pow(10, -17), 10000 );
        camera.position.z = 1000;
        super(camera);

        stats.init();

        let stars = 3000000;

        let galaxyGen = new GalaxyGen(stars);

        galaxyGen.generateGalaxy();
        //this.star = new Star();
        //this.scene.add(this.star);


        //Math.acos(Math.pow(r1, 2)) * r * ((angle + r2 - 0.5) % (Math.PI * armLength))

        // create the particle variables
        var particleCount = stars,
            particles = new THREE.Geometry(),
            pMaterial = new THREE.PointCloudMaterial({
                map: THREE.ImageUtils.loadTexture(
                    "/static/images/particle.png"
                ),
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        var hDistance = 0;
        for (var p = 0; p < particleCount; p++) {
            var star = GalaxyGen.getStarArray()[p];
            var particle = new THREE.Vector3(star.x, star.y, star.z);
            particles.vertices.push(particle);
        }

        console.log('h', hDistance, distFromCenter);

        var pointCloud = new THREE.PointCloud(
            particles,
            pMaterial);

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

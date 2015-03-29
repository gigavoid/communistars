let Engine = require('./engine'),
    Star = require('./bodys/star'),
    Input = require('./input');


class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, Math.pow(10, -17), 10000 );
        camera.position.z = 1000;
        super(camera);

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

    update() {
        if (this.input.isDown('moveForward')) {
            this.camera.translateZ(-10);
        }

        if (this.input.isDown('moveBackward')) {
            this.camera.translateZ(10);
        }

        if (this.input.isDown('moveLeft')) {
            this.camera.translateX(-10);
        }

        if (this.input.isDown('moveRight')) {
            this.camera.translateX(10);
        }

        if (this.input.isDown('moveDown')) {
            this.camera.translateY(-10);
        }

        if (this.input.isDown('moveUp')) {
            this.camera.translateY(10);
        }

        let diff = this.input.getMouseDiff();
        this.camera.rotateY(diff.x * .001);
        //this.camera.rotateZ(diff.z * .001);
    }
}

let game = new Game();
game.start();

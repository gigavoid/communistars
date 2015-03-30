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

        var galaxySize = 27000;

        // create the particle variables
        var particleCount = 1000000,
            particles = new THREE.Geometry(),
            pMaterial = new THREE.PointCloudMaterial({
                color: 0xFFFFFF,
                size: 20,
                map: THREE.ImageUtils.loadTexture(
                    "/static/images/particle.png"
                ),
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        for (var p = 0; p < particleCount; p++) {

            var r = galaxySize / 2;
            var distFromCenter = r - Math.sqrt(Math.random() * Math.pow(r, 2));
            var angle = Math.random() * (Math.PI * 2);

            var pX = distFromCenter * Math.cos(angle),
                pY = distFromCenter * Math.sin(angle);

            //var x = (distFromCenter / r) * -20;
            //var y = -(Math.pow(2, x - 4.35) * Math.pow(x - 4.35, 3));
            var height = Math.sqrt(Math.random() * Math.pow(r - distFromCenter, 2));
            var pZ = Math.random() * height - height / 2,
                particle = new THREE.Vector3(pX, pY, pZ);
            particles.vertices.push(particle);
        }

        var pointCloud = new THREE.PointCloud(
            particles,
            pMaterial);

        this.scene.add(pointCloud);

        this.star = new Star();
        this.scene.add(this.star);

        this.input = new Input();
    }

    update() {
        if (this.input.isDown('moveForward')) {
            this.camera.translateZ(-30);
        }

        if (this.input.isDown('moveBackward')) {
            this.camera.translateZ(30);
        }

        if (this.input.isDown('moveLeft')) {
            this.camera.translateX(-30);
        }

        if (this.input.isDown('moveRight')) {
            this.camera.translateX(30);
        }

        if (this.input.isDown('moveDown')) {
            this.camera.translateY(-30);
        }

        if (this.input.isDown('moveUp')) {
            this.camera.translateY(30);
        }

        let diff = this.input.getMouseDiff();
        this.camera.rotateY(-diff.x * .0031);
        this.camera.rotateX(-diff.y * .003);
    }
}

let game = new Game();
game.start();

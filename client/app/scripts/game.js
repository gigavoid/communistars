let Engine = require('./engine'),
    Star = require('./star'),
    Input = require('./input');


class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        super(camera);

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

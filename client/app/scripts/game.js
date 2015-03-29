let Engine = require('./engine');
let Star = require('./star');


class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        super(camera);

        this.star = new Star();
        this.scene.add(this.star);
    }

    update() {
        this.star.rotation.x += 0.01;
        this.star.rotation.y += 0.02;
    }

}

let game = new Game();
game.start();

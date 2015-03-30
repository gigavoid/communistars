class Engine {
    constructor(camera) {
        this.camera = camera;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.clock = new THREE.Clock();

        document.querySelector('.game-window').appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.updateRendererSize();
            this.updateAspectRatio();
        });

        this.updateRendererSize();
        this.updateAspectRatio();
    }

    updateAspectRatio() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    updateRendererSize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        window.requestAnimationFrame(() => {
            this.animate()
        });
        this.update(this.clock.getDelta());
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.animate();
    }

    update() {}
}

module.exports = Engine;

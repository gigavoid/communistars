let Body = require('./body');

let starMaterial = new THREE.MeshBasicMaterial({
    color: 0xC9BD00,
    wireframe: true
});

let starGeometry = new THREE.CircleGeometry(200, 32);

class Star extends Body {
    constructor() {
        super();
        let mesh = new THREE.Mesh(starGeometry, starMaterial);
        this.add(mesh);
    }
}


module.exports = Star;

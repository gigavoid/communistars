const THREE = require('three');
let Body = require('./body');

let starMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

let starGeometry = new THREE.SphereGeometry(7.351 * Math.pow(10, -8), 32, 32);

class Star extends Body {
    constructor() {
        super();
        let mesh = new THREE.Mesh(starGeometry, starMaterial);
        this.add(mesh);
    }
}


module.exports = Star;

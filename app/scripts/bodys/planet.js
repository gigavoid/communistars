let Body = require('./body');

let planetMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
});

let planet = new THREE.SphereGeometry(20, 32, 32);

class Planet extends Body {
    constructor(x, y, z) {
        super();
        let mesh = new THREE.Mesh(planet, planetMaterial);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;

        this.add(mesh);
    }
}


module.exports = Planet;

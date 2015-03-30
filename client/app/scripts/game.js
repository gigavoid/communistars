let Engine = require('./engine'),
    Star = require('./bodys/star'),
    Input = require('./input'),
    client = require('./client'),
    stats = require('./stats'),
    Planet = require('./bodys/planet');

class Game extends Engine {
    constructor() {
        let camera = new THREE.PerspectiveCamera( 75, 0, Math.pow(10, -17), 10000 );
        camera.position.z = 1000;
        super(camera);

        stats.init();

        client.connect({}, (err, client) => {
            if (err) alert('Could not connect to the server:\n' + err);

            client.newPlanet = (planet) => {
                this.scene.add(new Planet(planet.pos.x, planet.pos.y, planet.pos.z));
            }
        });

        //this.star = new Star();
        //this.scene.add(this.star);

        var galaxySize = 27000,
            armLength = 3,
            r = galaxySize / 2,
            maxAngle = (Math.PI * armLength * 2) + Math.PI,
            maxDistance = (Math.acos(0) * r * (Math.PI * armLength)) / (armLength * 2),
            galaxyHeightMult = 4000;
        //Math.acos(Math.pow(r1, 2)) * r * ((angle + r2 - 0.5) % (Math.PI * armLength))

        // create the particle variables
        var particleCount = 10000000,
            particles = new THREE.Geometry(),
            pMaterial = new THREE.PointCloudMaterial({
                color: Math.floor(Math.random()*0xFFFFFF),
                size: 1,
                map: THREE.ImageUtils.loadTexture(
                    "/static/images/particle.png"
                ),
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        var hDistance = 0;
        for (var p = 0; p < particleCount; p++) {

            var angle = Math.random() * (Math.PI * armLength * 2) + Math.PI;
            var r1 = Math.random();
            var r2 = Math.random();
            var distFromCenter = (Math.acos(Math.pow(r1, 2)) * r * ((angle + r2 - 0.5) % (Math.PI * armLength))) / (armLength * 2);
           /* var a = (distFromCenter / maxDistance) * -20,
                b = -(Math.pow(2, (a + 5) - 4.35) * Math.pow((a + 5) - 4.35, 3)),
                z = (Math.random() * b / 4 - b / 8) * maxDistance;
*/
            //var z = Math.pow((distFromCenter / maxDistance), 2) * 2000 - Math.max(0, Math.pow((distFromCenter / maxDistance), 2) * 5000);

            if (distFromCenter > hDistance)
                hDistance = distFromCenter;

            if (hDistance > 33000) {
                //debugger;
            }

            var a = (distFromCenter / maxDistance) * 10 - 2;


            //var z = Math.pow((a - .07), 2) * 100 + Math.pow((a - .07), 3) * 1000;
            var z = -a/(Math.pow(Math.pow(a, 2) + 1 , 1/2)) + 1.1;

            z*=galaxyHeightMult;

            z*= Math.random() * 2 - 1;

            var x = distFromCenter * Math.cos(angle),
                y = distFromCenter * Math.sin(angle),
                particle = new THREE.Vector3(x, y, z);
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

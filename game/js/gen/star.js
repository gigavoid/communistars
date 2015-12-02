let Planet = require('./planet');

class Star{
    constructor(x, y, z){
        this.planets = [];

        this.size = (Math.random() * 5 + 5) * Math.pow(10, -8);
        this.color = Math.floor(Math.random() * 0xFFFFFF);
        this.position = {x: x, y: y, z: z};
        this.generatePlanets();
    }

    generatePlanets(){
        let nrOfPlanets = Math.floor(Math.random() * 3) * Math.floor(Math.random() * 4)

        /*for (var i = 0; i < nrOfPlanets; i++){
            let planet = new Planet();
            this.planets.push(planet);
        }*/
    }
}

module.exports = Star;

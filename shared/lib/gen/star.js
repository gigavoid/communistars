'use strict';

let Planet = require('./planet');

class Star{
    constructor(x, y, z, random){
        this.random = random;
        this.planets = [];

        this.size = (this.random.next() * 5 + 5) * Math.pow(10, -8);
        this.color = Math.floor(this.random.next() * 0xFFFFFF);
        this.position = {x: x, y: y, z: z};
        this.generatePlanets();
    }

    generatePlanets(){
        let nrOfPlanets = Math.floor(this.random.next() * 3) * Math.floor(this.random.next() * 4)

        for (var i = 0; i < nrOfPlanets; i++){
            let planet = new Planet(this.random);
            this.planets.push(planet);
        }
    }
}

module.exports = Star;

'use strict';

let Star = require('./star');
let Random = require('random-js');

class Galaxy {
    constructor(seed) {
        this.random = Random.engines.mt19937().seed(seed);

        this.random.next = function() {
            return this.random.real(0, 1);
        };

        this.stars = [];

        this.nrOfStars = 3000000;
        this.galaxySize = 54000;
        this.armLength = 3;
        this.radius = this.galaxySize / 2;
        this.maxDistance = (Math.acos(0) * this.radius * (Math.PI * this.armLength)) / (this.armLength * 2);
        this.galaxyHeightMult = 4000;
    }

    generateGalaxy(){
        for (let i = 0; i < this.nrOfStars; i++){
            let angle = this.random.next() * (Math.PI * this.armLength * 2) + Math.PI;
            let distFromCenter = (Math.acos(Math.pow(this.random.next(), 2)) * this.radius * ((angle + this.random.next() - 0.5) % (Math.PI * this.armLength))) / (this.armLength * 2);
            let heightRatio = (distFromCenter / this.maxDistance) * 10 - 2;
            let z = (-heightRatio / (Math.pow(Math.pow(heightRatio, 2) + 1 , 1/2)) + 1.15) * this.galaxyHeightMult * (this.random.next() * 2 - 1);
            let x = distFromCenter * Math.cos(angle), y = distFromCenter * Math.sin(angle);
            this.stars.push(new Star(x, y, z, this.r.getSeed()));
        }
    }
}

module.exports = Galaxy;

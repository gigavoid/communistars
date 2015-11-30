let Star = require('./star');

class GalaxyGen {
    constructor(stars) {
        this.galaxy = [stars];

        this.nrOfStars = stars;
        this.galaxySize = 54000;
        this.armLength = 3;
        this.radius = this.galaxySize / 2;
        this.maxDistance = (Math.acos(0) * this.radius * (Math.PI * this.armLength)) / (this.armLength * 2);
        this.galaxyHeightMult = 4000;
        generateGalaxy();
    }

    getStarArray(){
        return this.galaxy;
    }

    generateGalaxy(){
        this.galaxy = [nrOfStars];
        for (let i = 0; i < this.nrOfStars; i++){
            let angle = Math.random() * (Math.PI * this.armLength * 2) + Math.PI;
            let distFromCenter = (Math.acos(Math.pow(Math.random(), 2)) * this.radius * ((angle + Math.random() - 0.5) % (Math.PI * this.armLength))) / (this.armLength * 2);
            let heightRatio = (distFromCenter / this.maxDistance) * 10 - 2;
            let z = (-heightRatio / (Math.pow(Math.pow(heightRatio, 2) + 1 , 1/2)) + 1.15) * this.galaxyHeightMult * (Math.random() * 2 - 1);
            let x = distFromCenter * Math.cos(angle), y = distFromCenter * Math.sin(angle);
            this.galaxy.push(new Star(x, y, z));
        }
    }
}

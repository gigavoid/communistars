'use strict';

class Planet{
    constructor(random){
        this.distance = (random.next() * 4 + 3) * Math.pow(10, -4 - random.next() * 2);
        this.size = (random.next() * 7 + 1) * Math.pow(10, -9 - random.next());
    }

    loadStructures(){

    }
}

module.exports = Planet;

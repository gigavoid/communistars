'use strict';

class Planet{
    constructor(){
        this.distance = (Math.random() * 4 + 3) * Math.pow(10, -4 - Math.random() * 2);
        this.size = (Math.random() * 7 + 1) * Math.pow(10, -9 - Math.random());
    }

    loadStructures(){

    }
}

module.exports = Planet;

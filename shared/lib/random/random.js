'use strict';
class Random{
    constructor(seed){
        this.seed = seed;
    }

    function next(){
        let value = Math.sin(this.seed++) * 10000;
        return value - Math.floor(value);
    }

    function getSeed(){
        return this.seed;
    }
}

module.exports = Random;
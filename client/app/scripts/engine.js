class Engine {
    constructor(a, b) {
        this.a = a;
        console.log('construct ', a, b);
    }

    get val() {
        return this.a;
    }

    doSmth() {
        this.a++;
    }

    print() {
        console.log(this.a);
    }
}

module.exports = Engine;

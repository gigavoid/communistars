let KeyboardJS = require('keyboardjs');

class Input {
    constructor() {
        this.mappings = {};

        this.map('moveForward', 'w');
        this.map('moveForward', 'up');

        this.map('moveBackward', 's');
        this.map('moveBackward', 'down');

        this.map('moveLeft', 'a');
        this.map('moveLeft', 'left');

        this.map('moveRight', 'd');
        this.map('moveRight', 'right');

        this.map('moveUp', 'space');

        this.map('moveDown', 'shift');

        document.body.addEventListener('click', () => this.lockCursor());
        document.addEventListener('mousemove', (e) => this.mouseMove(e));

        this.deltaX = 0;
        this.deltaY = 0;
    }

    getMouseDiff() {
        let resp = {
            x: this.deltaX,
            y: this.deltaY
        };

        this.deltaX = this.deltaY = 0;

        return resp;
    }

    isDown(action) {
        if (!this.mappings[action])
            return false;

        var activeKeys = KeyboardJS.activeKeys();

        var ret = false;
        this.mappings[action].forEach((key) => {
            if (activeKeys.indexOf(key) !== -1) {
                ret = true;
            }
        });
        return ret;
    }

    map(action, key) {
        if (!this.mappings[action])
            this.mappings[action] = [];

        this.mappings[action].push(key);
    }

    lockCursor() {
        document.body.requestPointerLock();
    }

    unlockCursor() {
        document.body.exitPointerLock();
    }

    mouseMove(e) {
        let movementX = e.movementX;
        let movementY = e.movementY;

        this.deltaX += movementX;
        this.deltaY += movementY;
    }
}

module.exports = Input;

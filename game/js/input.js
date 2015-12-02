
/**
 * Speed values in lightyears / sec
 */
const SPEED_FORWARD = 3000 * 5,
    SPEED_BACKWARD = 3000 * 5,
    SPEED_SIDE = 3000 * 5,
    SPEED_VERTICAL = 3000 * 5,

    /**
     * Roll speed in radians / sec
     */
    ROLL_SPEED = 5,

    /**
     * Mouse sensitivity, how many radians each pixel of mouse movement should be translated to
     */
    MOUSE_SENSITIVITY = .005;

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

        this.map('rollLeft', 'q');
        this.map('rollRight', 'e');

        document.body.addEventListener('click', () => this.lockCursor());
        document.addEventListener('mousemove', (e) => this.mouseMove(e));

        this.deltaX = 0;
        this.deltaY = 0;

        this.activeKeys = [];

        this.addEvents();
    }

    addEvents() {
        console.log('addevent');

        window.addEventListener('keydown', e => {
            this.activeKeys[this.keycodeToString(e.which)] = true;
        });

        window.addEventListener('keyup', e => {
            delete this.activeKeys[this.keycodeToString(e.which)];
        });
    }

    keycodeToString(which) {
        if (which === 32) {
            return 'space';
        } else if (which === 16) {
            return 'shift';
        } else {
            return String.fromCharCode(which).toLowerCase();
        }
        return key;
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

        var ret = false;
        this.mappings[action].forEach((key) => {
            if (this.activeKeys[key] === true) {
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

    isCursorLocked() {
        return !!document.pointerLockElement;
    }

    mouseMove(e) {
        if (!this.isCursorLocked())
            return;
        let movementX = e.movementX;
        let movementY = e.movementY;

        if (movementX > 1000 || movementY > 1000 || movementX < -1000 || movementY < -1000)
            return;

        this.deltaX += movementX;
        this.deltaY += movementY;
    }

    updateCamera(camera, dt) {
        if (this.isDown('moveForward')) {
            camera.translateZ(-SPEED_FORWARD * dt);
        }

        if (this.isDown('moveBackward')) {
            camera.translateZ(SPEED_BACKWARD * dt);
        }

        if (this.isDown('moveLeft')) {
            camera.translateX(-SPEED_SIDE * dt);
        }

        if (this.isDown('moveRight')) {
            camera.translateX(SPEED_SIDE * dt);
        }

        if (this.isDown('moveDown')) {
            camera.translateY(-SPEED_VERTICAL * dt);
        }

        if (this.isDown('moveUp')) {
            camera.translateY(SPEED_VERTICAL * dt);
        }

        if (this.isDown('rollLeft')) {
            camera.rotateZ(ROLL_SPEED * dt);
        }

        if (this.isDown('rollRight')) {
            camera.rotateZ(-ROLL_SPEED * dt);
        }

        let diff = this.getMouseDiff();
        camera.rotateY(-diff.x * MOUSE_SENSITIVITY);
        camera.rotateX(-diff.y * MOUSE_SENSITIVITY);

        //console.log(camera.position)
    }
}

module.exports = Input;

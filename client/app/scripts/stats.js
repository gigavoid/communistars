var stats = new Stats();

function init() {
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );
}

module.exports.init = init;
module.exports.begin = stats.begin;
module.exports.end = stats.end;

let lib = require('./lib');

var scene, camera, renderer;
var geometry, material, mesh;

var circleGeometry;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    
    circleGeometry = new THREE.CircleGeometry(200, 32);
    material = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true });

    mesh = new THREE.Mesh( circleGeometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.querySelector('.game-window').appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}

window.addEventListener('resize', function(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

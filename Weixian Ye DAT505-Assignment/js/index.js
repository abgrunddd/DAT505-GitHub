document.addEventListener('DOMContentLoaded', function () {
  threeStart();
})
// Frame rate statistics
var stats;

function initStats() {
  stats = new Stats();
  document.getElementById('canvas-frame').appendChild(stats.dom);
}
var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );

var clock = new THREE.Clock();

//create a renderer
var renderer;
function initThree() {
  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: renderer
  });
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 1);
}

// create a camera
var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.x = -500;
  camera.position.y = 500;
  camera.position.z = -500;
  camera.lookAt({ x: 0, y: 0, z: 0 });
}

function render() {
  var time = Date.now() * 0.0005;
  var delta = clock.getDelta();

  if ( object ) object.rotation.y -= 0.5 * delta;
  light1.position.x = Math.sin( time * 0.7 ) * 30;
  light1.position.y = Math.cos( time * 0.5 ) * 40;
  light1.position.z = Math.cos( time * 0.3 ) * 30;

  light2.position.x = Math.cos( time * 0.3 ) * 30;
  light2.position.y = Math.sin( time * 0.5 ) * 40;
  light2.position.z = Math.sin( time * 0.7 ) * 30;

  light3.position.x = Math.sin( time * 0.7 ) * 30;
  light3.position.y = Math.cos( time * 0.3 ) * 40;
  light3.position.z = Math.sin( time * 0.5 ) * 30;

  light4.position.x = Math.sin( time * 0.3 ) * 30;
  light4.position.y = Math.cos( time * 0.7 ) * 40;
  light4.position.z = Math.sin( time * 0.5 ) * 30;


// create a sence
var scene;
function initScene() {
  scene = new THREE.Scene();
}

// create light
var light;
function initLight() {

  // A light source positioned directly above the scene,
  //with color fading from the sky color to the ground color.
  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  light = new THREE.AmbientLight(0xFFFFFF);
  light.position.set(100, 100, 200);
  scene.add(light);

}

// create a earth
var earthMesh;
function initEarth() {
  var earthGeometry = new THREE.SphereGeometry(200, 100, 100);
  var earthMater = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('earth.jpg'),
    side: THREE.DoubleSide
  });
  earthMesh = new THREE.Mesh(earthGeometry, earthMater);
  scene.add(earthMesh);
}

// create clouds
var cloudsMesh;
function initClouds() {
  var cloudsGeometry = new THREE.SphereGeometry(201, 100, 100);
  var cloudsMater = new THREE.MeshPhongMaterial({
    alphaMap: new THREE.TextureLoader().load('clouds.jpg'),
    transparent: true,
    opacity: 0.2
  });
  cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMater);
  scene.add(cloudsMesh);
}

//create a torusbuffergeometry
var starMesh;
function initStar(){
  var starGeometry = new THREE.SphereGeometry(201.5, 100, 100);
  var starMater = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('star.jpg'),
    transparent: true,
    opacity: 0.35
  });
  starMesh = new THREE.Mesh(starGeometry, starMater);
  scene.add(starMesh);
}


var controls;
function threeStart() {
  initThree();
  initStats();
  initCamera();
  initScene();
  initLight();
  initEarth();
  initClouds();
  initStar();
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.clear();
  animate();
}

function animate() {
  controls.update();
  stats.update();

  // Continuously rotate two mesh
  earthMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.005;
  cloudsMesh.rotation.z += 0.005;
  starMesh.rotation.y += 0.0035;
  starMesh.rotation.z += 0.0035;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

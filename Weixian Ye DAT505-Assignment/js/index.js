document.addEventListener('DOMContentLoaded', function () {
        threeStart();
    })
// Frame rate statistics
var stats;
function initStats() {
  stats = new Stats();
  document.getElementById('canvas-frame').appendChild(stats.dom);
}

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

var controls;
function threeStart() {
  initThree();
  initStats();
  initCamera();
  initScene();
  initLight();
  initEarth();
  initClouds();
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

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

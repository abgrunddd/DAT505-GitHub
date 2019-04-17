document.addEventListener('DOMContentLoaded', function () {
  threeStart();
})

//
var stats;
function initStats() {
  stats = new Stats();
  document.getElementById('canvas-frame').appendChild(stats.dom);
}

// create a renderer
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
  renderer.setClearColor(0x000000, 1.0);
}

// create a camera
var camera;
function initCamera() {
  // 透视相机 视角越大，看到的场景越大，那么中间的物体相对于整个场景来说，就越小了
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.x = -500;
  camera.position.y = 500;
  camera.position.z = -500;
  camera.lookAt({ x: 0, y: 0, z: 0 });
}

// create a scene
var scene;
function initScene() {
  scene = new THREE.Scene();
}

// create a light
//var light;
function initLight() {

// 环境光
light = new THREE.AmbientLight(0xFFFFFF);
light.position.set(100, 100, 200);
scene.add(light);

}
var sphere = new THREE.SphereBufferGeometry( 500, 160, 800 );
var light1, light2, light3, light4;
var clock = new THREE.Clock();



// create a earth
var earthMesh;
function initEarth() {
  var earthGeo = new THREE.SphereGeometry(200, 100, 100);
  var earthMater = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('earth.jpg'),
    side: THREE.DoubleSide
  });
  earthMesh = new THREE.Mesh(earthGeo, earthMater);
  scene.add(earthMesh);
}

// create clouds
var cloudsMesh;
function initClouds() {
  var cloudsGeo = new THREE.SphereGeometry(201, 100, 100);
  var cloudsMater = new THREE.MeshPhongMaterial({
    alphaMap: new THREE.TextureLoader().load('clouds.jpg'),
    transparent: true,
    opacity: 0.2
  });
  cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMater);
  scene.add(cloudsMesh);
}

//create stars
var starmesh;
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
  // 载入控制器
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.clear();
  animate();
}

function animate() {

  requestAnimationFrame(animate);

  controls.update();
  stats.update();

  earthMesh.rotation.y -= 0.002;
  cloudsMesh.rotation.y -= 0.005;
  cloudsMesh.rotation.z += 0.005;

  starMesh.rotation.y += 0.0035;
  starMesh.rotation.z += 0.0035;


  renderer.render(scene, camera);
}

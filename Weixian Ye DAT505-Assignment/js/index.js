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

//lights

light1 = new THREE.PointLight( 0xff0040, 2, 50 );
light1.add( new THREE.Mesh( earthMesh, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
scene.add( light1 );

light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
light2.add( new THREE.Mesh( earthMesh, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
scene.add( light2 );

light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
light3.add( new THREE.Mesh( earthMesh, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
scene.add( light3 );

light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
light4.add( new THREE.Mesh( earthMesh, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
scene.add( light4 );


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
    opacity: 0.6
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

function render() {
var time = Date.now() * 0.0005;

var delta = clock.getDelta();

if ( earthMesh) earthMesh.rotation.y -= 0.5 * delta;

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
}

function animate() {

  requestAnimationFrame(animate);

  controls.update();
  stats.update();

  earthMesh.rotation.y += 0.004;
  cloudsMesh.rotation.y -= 0.005;
  cloudsMesh.rotation.z += 0.005;
  starMesh.rotation.y += 0.004;



  renderer.render(scene, camera);
}

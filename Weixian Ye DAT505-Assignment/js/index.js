document.addEventListener('DOMContentLoaded', function () {
  threeStart();
})

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
  camera.position.y = 800;
  camera.position.z = 100;
  camera.lookAt({ x: 0, y: 0, z: 0 });
}

// create a scene
var scene;
function initScene() {
  scene = new THREE.Scene();
}


var light1, light2, light3, light4;
var clock = new THREE.Clock();
// create a light
var light;
function initLight() {

// 环境光
light = new THREE.AmbientLight(0xFFFFFF);
light.position.set(100, 100, 200);
scene.add(light);

var sphere = new THREE.SphereBufferGeometry( 16.5, 50,50 );

//red
light1 = new THREE.PointLight( 0xff0040, 800, 100 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xAD5A5A } ) ) );
scene.add(light1);

//blue
light2 = new THREE.PointLight( 0x0040ff, 800, 100 );
light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x7373B9 } ) ) );
scene.add( light2 );

//green
light3 = new THREE.PointLight( 0x80ff80, 800, 100 );
light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x4F9D9D } ) ) );
scene.add( light3 );

//yellow
light4 = new THREE.PointLight( 0xffaa00, 800, 100 );
light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xEAC100 } ) ) );
scene.add( light4 );


}



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
  var starGeo = new THREE.SphereGeometry(201.5, 100, 100);
  var starMater = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('star.jpg'),
    transparent: true,
    opacity: 0.6
  });
  starMesh = new THREE.Mesh(starGeo, starMater);
  scene.add(starMesh);
}


var controls;
function threeStart() {
  initThree();
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
console.log("1");
if ( earthMesh) earthMesh.rotation.y -= 0.5 * delta;


}

function animate() {
  var time = Date.now() * 0.0005;

  var delta = clock.getDelta();
  requestAnimationFrame(animate);

  controls.update();
  //stats.update();

  earthMesh.rotation.y += 0.004;
  cloudsMesh.rotation.y += 0.005;
  cloudsMesh.rotation.z += 0.005;
  starMesh.rotation.y += 0.004;


  light1.position.x = Math.sin( time * 3) * 400;
  light1.position.y = Math.cos( time * 2) * 400;
  light1.position.z = Math.sin( time * 2) * 400;

  light2.position.x = Math.cos( time * 3 ) * 450;
  light2.position.y = Math.sin( time * 2 ) * 450;
  light2.position.z = Math.sin( time * 2 ) * 450;

  light3.position.x = Math.sin( time * 3 ) * 400;
  light3.position.y = Math.cos( time * 2 ) * 400;
  light3.position.z = Math.sin( time * 2 ) * 400;

  light4.position.x = Math.sin( time * 3 ) * 420;
  light4.position.y = Math.cos( time * 2 ) * 420;
  light4.position.z = Math.sin( time * 2 ) * 420;



  renderer.render(scene, camera);
}

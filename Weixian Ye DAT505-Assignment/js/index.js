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

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.x = -500;
  camera.position.y = 1300;
  camera.position.z = 100;
  camera.lookAt({ x: 0, y: 0, z: 0 });
}

// create a scene
var scene;
function initScene() {
  scene = new THREE.Scene();

//create a background
  var background = new THREE.CubeTextureLoader()
  					.setPath( 'Texture/' )
  					.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
  				background.format = THREE.RGBFormat;
  				scene.background = background;
}

//crerte PointLights
var light1, light2, light3, light4，light5，light6，light7，light8;
var clock = new THREE.Clock();

// create a light
var light;
function initLight() {

// 环境光
light = new THREE.AmbientLight(0xFFFFFF);
light.position.set(100, 10, 20);
scene.add(light);

//create PointLight's SphereGeometry
var sphere = new THREE.SphereBufferGeometry( 10, 50, 50 );

//red
light1 = new THREE.PointLight( 0xff0040, 800, 250 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xAD5A5A } ) ) );
scene.add(light1);

//blue
light2 = new THREE.PointLight( 0x0040ff, 1800, 250 );
light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x7373B9 } ) ) );
scene.add( light2 );

//green
light3 = new THREE.PointLight( 0x80ff80, 1800, 250 );
light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x4F9D9D } ) ) );
scene.add( light3 );

//yellow
light4 = new THREE.PointLight( 0xffaa00, 800, 250 );
light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xEAC100 } ) ) );
scene.add( light4 );

//orange
light5 = new THREE.PointLight( 0xffaa00, 800, 250 );
light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF9224 } ) ) );
scene.add( light5 );


//purple
light6 = new THREE.PointLight( 0xffaa00, 800, 250 );
light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xAE57A4 } ) ) );
scene.add( light6 );

//grey
light7 = new THREE.PointLight( 0xffaa00, 800, 250 );
light7.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x7B7B7B } ) ) );
scene.add( light7 );

//pink
light8 = new THREE.PointLight( 0xffaa00, 800, 250 );
light8.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF359A } ) ) );
scene.add( light8 );
}

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();// create a global audio source
var sound = new THREE.Audio( listener );// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();

audioLoader.load( 'Audio/123.wav', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( false );
      sound.setVolume( 0.5 );
      sound.play();
    });

// create a earth
var earthMesh;
function initEarth() {
  var earthGeo = new THREE.SphereGeometry(200, 100, 100);
  var earthMater = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('Texture/earth.jpg'),
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
    alphaMap: new THREE.TextureLoader().load('Texture/clouds.jpg'),
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
    map: new THREE.TextureLoader().load('Texture/star.jpg'),
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

//load controller
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.clear();
  animate();
}

function render() {
//create time
var time = Date.now() * 0.0005;

var delta = clock.getDelta();
console.log("1");
if ( earthMesh) earthMesh.rotation.y -= 0.5 * delta;


}

function animate() {
  var time = Date.now() * 0.002;

  var delta = clock.getDelta();
  requestAnimationFrame(animate);

  controls.update();

  earthMesh.rotation.y += 0.003;
  cloudsMesh.rotation.y += 0.004;
  cloudsMesh.rotation.z += 0.004;
  starMesh.rotation.y += 0.003;

  light1.position.x = Math.cos( time * 2) * 390;
  light1.position.y = Math.cos( time * 2) * 390;
  light1.position.z = Math.sin( time * 2) * 390;

  light2.position.x = Math.cos( time * 2 ) * 400;
  light2.position.y = Math.sin( time * 1 ) * 400;
  light2.position.z = Math.sin( time * 1 ) * 400;

  light3.position.x = Math.sin( time * 2 ) * 410;
  light3.position.y = Math.cos( time * 1 ) * 410;
  light3.position.z = Math.sin( time * 1 ) * 410;

  light4.position.x = Math.cos( time * 2 ) * 370;
  light4.position.y = Math.cos( time * 1 ) * 370;
  light4.position.z = Math.sin( time * 1 ) * 370;

  light5.position.x = Math.sin( time * 2 ) * 430;
  light5.position.y = Math.cos( time * 1 ) * 430;
  light5.position.z = Math.cos( time * 1 ) * 430;

  light6.position.x = Math.sin( time * 2 ) * 420;
  light6.position.y = Math.cos( time * 1 ) * 420;
  light6.position.z = Math.sin( time * 1 ) * 420;

  light7.position.x = Math.sin( time * 2 ) * 410;
  light7.position.y = Math.cos( time * 1 ) * 410;
  light7.position.z = Math.cos( time * 2 ) * 410;

  light8.position.x = Math.sin( time * 2 ) * 380;
  light8.position.y = Math.cos( time * 1 ) * 380;
  light8.position.z = Math.cos( time * 1 ) * 380;

  renderer.render(scene, camera);
}

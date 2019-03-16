var renderer, scene, camera;
var controls;
var cubes = [];
var randomSpeedX = [];
var randomSpeedY = [];

var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0,1000,0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.CylinderGeometry(2, 2, 2);

      var texture1 = new THREE.TexturLoader().load("textures" + Math.floor(Math.random()*3));


      var meshMaterial = new THREE.MeshBasicMaterial({map:texture1});

      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});


      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.y = y;

      mesh.rotation.x = 360* Math.random() ;
      mesh.rotation.y = 360* Math.random() ;
      mesh.rotation.z = 360* Math.random() ;

      var randomValueX = (Math.random()*0.1) - 0.05;
      var randomValueY = (Math.random()*0.1) - 0.05;

      randomSpeedX.push(randomValueX);
      randomSpeedY.push(randomValueY);

      scene.add(mesh);
      cubes.push(mesh);
    }
  }
  console.log(cubes);
  document.body.appendChild(renderer.domElement);
}

var scaleCube = -1;
var scaleCube1 = -0.3;
var scaleCube2 = -0.8;

function drawFrame(){
  requestAnimationFrame(drawFrame);

 scaleCube += 0.05;
 if (scaleCube > 2) scaleCube = -5;

 cubes.forEach(function(c,i) {
     c.rotation.x += 0.1;
     c.rotation.y += 0.2;
     c.rotation.z += 0.1;
     c.scale.x = scaleCube;
     c.scale.y = scaleCube1;
     c.scale.z = scaleCube2;
   });

 console.log(scaleCube)

  //rot += 0.05;

//cubes[6].rotation.x += randomSpeedX[6]
//cubes[18].rotation.x += randomSpeedX[18]

  //cubes.forEach(function(c,i){
    //c.rotation.x = rot;
    //c.rotation.z = rot;
//  });

  //forEach takes all the array entries and passes the c as the object, and i as the index
  //cubes.forEach(function(c, i) {
  //c.rotation.z = rot; //Rotate the object that is referenced in c
  //});

  renderer.render(scene, camera);
}

init();
drawFrame();

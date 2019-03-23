// -----------------------------------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene --------------------------
var scene = new THREE.Scene();

// Create a basic perspective camera --------------
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

// Create a renderer with Antialiasing ------------
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#A5A5B4");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Configure lights -------------------------------
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
// ------------------------------------------------

// -----------------------------------------------------------------------------

// ------------------------------------------------
// Main Content
// ------------------------------------------------

// Create a Cube Mesh with basic material ---------
var geometry1 = new THREE.BoxGeometry(100, 10, 100);

// Create a Cube Mesh with basic material ---------
var geometry2 = new THREE.ConeGeometry(100, 1, 100);

// Create a Cube Mesh with basic material ---------
var geometry3 = new THREE.SphereGeometry(75, 100, 75);



// MATERIAL 1:
//var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );

//MATERIAL 2:
//var material = new THREE.MeshNormalMaterial();

//MATERIAL 3:
/*
var material6 = new THREE.MeshLambertMaterial({
  color: "#433F81",
  transparent: true,
  opacity: 1
});
*/

//MATERIAL 4:
var material4 = new THREE.MeshPhongMaterial({shininess: 1});

//MATERIAL 5 (non-shiny material):

var material6 = new THREE.MeshLambertMaterial({
  color: '#D2BE82',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});


//var material2 = new THREE.MeshNormalMaterial();


//MATERIAL 6 (shiny material):
/*
var material = new THREE.MeshPhongMaterial({
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 1000,
  lightMap: null,
  lightMapIntensity: 1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});
*/



//MATERIAL 6 (combination of shiny + non-shinny):

var material5 = new THREE.MeshStandardMaterial({
  color: 0xF3FFE2,
  roughness: 0.5,
  metalness: 0.5
});



//MATERIAL 7 (physical-based material)

/*
var material7 = new THREE.MeshPhysicalMaterial({
  color: 0xF3FFE2,
  roughness: 0,
  metalness: 0.5,
  reflectivity: 0.5,
  clearCoat: 0,
  claerCoatRoughness: 0
});
*/

//Load a textrue
var texture1 = new THREE.TextureLoader().load( "texture1.jpg" );

//Create a MeshBasicMaterial with a loaded textrue
var material4 = new THREE.MeshPhongMaterial( { map: texture1 } );


//Load a textrue
var texture2 = new THREE.TextureLoader().load( "texture2.jpg" );

//Create a MeshBasicMaterial with a loaded textrue
var material5 = new THREE.MeshStandardMaterial( { map: texture2 } );


//Load a textrue
var texture3 = new THREE.TextureLoader().load( "texture3.jpg" );

//Create a MeshBasicMaterial with a loaded textrue
var material6 = new THREE.MeshLambertMaterial( { map: texture3 } );






var mesh1 = new THREE.Mesh( geometry1, material4 );
mesh1.position.z = -1000;
mesh1.position.y = -100;

var mesh2 = new THREE.Mesh( geometry2, material5);
mesh2.position.z = -1000;
mesh2.position.x = -100;
mesh2.position.y = 200;


var mesh4 = new THREE.Mesh( geometry3, material6 );
mesh4.position.z = -1000;
mesh4.position.x = 200;
mesh4.position.y = 100;



// ------------------------------------------------

// Add mesh to scene
scene.add( mesh1 );
scene.add( mesh2 );
scene.add( mesh4 );

var rot = 0;

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  rot += 0.01;

  mesh1.rotation.x = rot+1; //Continuously rotate the mesh
  mesh1.rotation.y = rot+1;

  mesh2.rotation.x = rot+1; //Continuously rotate the mesh
  mesh2.rotation.y = rot+1;

  mesh4.rotation.x = rot; //Continuously rotate the mesh
  mesh4.rotation.y = rot;



  // Render the scene
  renderer.render(scene, camera);
};

render(); //Run the function render

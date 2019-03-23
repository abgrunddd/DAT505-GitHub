//Global variables
var scene, camera, renderer;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3;
var geometry4, material4, mesh4;
var geometry5, material5, mesh5;
var geometry6, material6, mesh6;
var geometry7, material7, mesh7;
var geometry8, material8, mesh8;
var geometry9, material9, mesh9;
var geometry10, material10, mesh10;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material粉上 ---------
  geometry1 = new THREE.CylinderGeometry(50, 50, 50);
  material1 = new THREE.MeshBasicMaterial( { color: "#FFB5B5" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -1000;
  mesh1.position.y = -100;

  // Add mesh to scene
  scene.add( mesh1 );


// Create a Cube Mesh with basic material左方块1 ---------
geometry2 = new THREE.SphereGeometry(75, 75, 75);
material2 = new THREE.MeshBasicMaterial( { color: "#A3D1D1" } );
mesh2 = new THREE.Mesh( geometry2, material2 );
mesh2.position.z = -1000;
mesh2.position.x = -100;

// Add mesh to scene
scene.add( mesh2 );

// Create a Cube Mesh with basic material右方块1---------
geometry3 = new THREE.SphereGeometry(75, 75, 75);
material3 = new THREE.MeshBasicMaterial( { color: "#A3D1D1" } );
mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.z = -1000;
mesh3.position.x = 100;


// Add mesh to scene
scene.add( mesh3 );

// Create a Cube Mesh with basic material粉下 ---------
geometry4 = new THREE.CylinderGeometry(50, 50, 50);
material4 = new THREE.MeshBasicMaterial( { color: "#FFB5B5" } );
mesh4 = new THREE.Mesh( geometry4, material4 );
mesh4.position.z = -1000;
mesh4.position.y = 100;

// Add mesh to scene
scene.add( mesh4 );

// Create a Cube Mesh with basic material左方块2 ---------
geometry5 = new THREE.CylinderGeometry(75, 75, 75);
material5 = new THREE.MeshBasicMaterial( { color: "#F5FFE8" } );
mesh5 = new THREE.Mesh( geometry5, material5 );
mesh5.position.z = -1000;
mesh5.position.x = -100;

// Add mesh to scene
scene.add( mesh5 );

// Create a Cube Mesh with basic material右方块2---------
geometry6 = new THREE.CylinderGeometry(75, 75, 75);
material6 = new THREE.MeshBasicMaterial( { color: "#F5FFE8" } );
mesh6 = new THREE.Mesh( geometry6, material6 );
mesh6.position.z = -1000;
mesh6.position.x = 100;


// Add mesh to scene
scene.add( mesh6 );

// Create a Cube Mesh with basic material粉下2 ---------
geometry7 = new THREE.SphereGeometry(45, 45, 45);
material7 = new THREE.MeshBasicMaterial( { color: "#FFEEDD" } );
mesh7 = new THREE.Mesh( geometry7, material7 );
mesh7.position.z = -1000;
mesh7.position.y = -100;

// Add mesh to scene
scene.add( mesh7 );

// Create a Cube Mesh with basic material粉上2 ---------
geometry8 = new THREE.SphereGeometry(45, 45, 45);
material8 = new THREE.MeshBasicMaterial( { color: "#FFEEDD" } );
mesh8 = new THREE.Mesh( geometry8, material8 );
mesh8.position.z = -1000;
mesh8.position.y = 100;

// Add mesh to scene
scene.add( mesh8 );

// Create a Cube Mesh with basic material紫下3---------
geometry9 = new THREE.SphereGeometry(23, 23, 23);
material9 = new THREE.MeshBasicMaterial( { color: "#C7C7E2" } );
mesh9 = new THREE.Mesh( geometry9, material9 );
mesh9.position.z = -1000;
mesh9.position.y = -200;

// Add mesh to scene
scene.add( mesh9 );


// Create a Cube Mesh with basic material紫下4 ---------
geometry10 = new THREE.BoxGeometry(35, 35, 35);
material10 = new THREE.MeshBasicMaterial( { color: "#FFEEDD" } );
mesh10 = new THREE.Mesh( geometry10, material10 );
mesh10.position.z = -1000;
mesh10.position.y = -200;

// Add mesh to scene
scene.add( mesh10 );


}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.05; //Continuously rotate the mesh
  mesh1.rotation.y += 0.05;


  renderer.setClearColor("#000000");


  mesh4.rotation.x += 0.05; //Continuously rotate the mesh
  mesh4.rotation.y += 0.05;

  renderer.setClearColor("#000000");


  mesh2.rotation.x += 0.03; //Continuously rotate the mesh
  mesh2.rotation.y += 0.03;

  renderer.setClearColor("#000000");

  mesh3.rotation.x += 0.03; //Continuously rotate the mesh
  mesh3.rotation.y += 0.03;

  renderer.setClearColor("#000000");

  mesh5.rotation.x += 0.03; //Continuously rotate the mesh
  mesh5.rotation.y += 0.03;

  renderer.setClearColor("#000000");

  mesh6.rotation.x += 0.03; //Continuously rotate the mesh
  mesh6.rotation.y += 0.03;

  renderer.setClearColor("#000000");

  mesh7.rotation.x += 0.05; //Continuously rotate the mesh
  mesh7.rotation.y += 0.05;

  renderer.setClearColor("#000000");

  mesh8.rotation.x += 0.05; //Continuously rotate the mesh
  mesh8.rotation.y += 0.05;

  renderer.setClearColor("#000000");

  mesh9.rotation.x += 0.04; //Continuously rotate the mesh
  mesh9.rotation.y += 0.04;

  renderer.setClearColor("#000000");

  mesh10.rotation.x += 0.04; //Continuously rotate the mesh
  mesh10.rotation.y += 0.04;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();

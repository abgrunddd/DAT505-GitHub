# Section 7

## 00-homework-random meterial cube drop
##### This code creates a scene, a camera, and some geometric cubes, and it adds the cube to the scene. It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.
```javascript
//Setup the global variables
var camera, scene, renderer, geometry, material, mesh;
var texture;
var cubesNum = 10;

var cubes = [];
var speed = [];

function init() {
	// Create a scene
	scene = new THREE.Scene();

```
##### Create a box (cube) of 10 width, length, and height.
```javascript

geometry = new THREE.BoxGeometry( 10, 10, 10 );

for (var i=0;i<cubesNum;i++){
  var randomValue = Math.random() * 0.5;
  speed.push(randomValue);

//Generate a random number from 1 to 4 (according to the image files)
var randomSelection = Math.round(Math.random()*5) + 1;
// Load a texture
texture = new THREE.TextureLoader().load( "textures/texture" + randomSelection + ".jpg");

// Create a MeshBasicMaterial with a loaded texture
material = new THREE.MeshBasicMaterial( { map: texture} );

// Combine the geometry and material into a mesh
mesh = new THREE.Mesh( geometry, material );

mesh.position.y = 30;


scene.add( mesh );
cubes.push(mesh );
}
```
###### This code defines the random x and y coordinates of these objects.

```javascript

for (var i=0; i<cubesNum; i++){
	// Rotate the x position of the mesh by 0.03
	cubes[i].rotation.x += speed[i] / 100;
	// Rotate the y position of the mesh by 0.02
  cubes[i].rotation.y += speed[i] / 80;

	//Move the mesh towards the bottom of the screen
  cubes[i].position.y -= speed[i];

	//If the mesh passes the bottom of the screen,
	//make it appear on the top. Also x position is randomized
	if (mesh.position.y <- 30){
		cubes[i].position.y = 35;
		cubes[i].position.x = (Math.random() * -20) +10;
		cubes[i].scale.x = Math.random();
		cubes[i].scale.y = Math.random();
		cubes[i].scale.z = Math.random();
	}
}
	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}

init();
animate();
```

## 01-homework-eyes follow mouse move
##### This code creates a scene, a camera, and some geometric cubes, and it adds the cube to the scene. It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

```javascript
var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;
var cubes = [];

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 10, 200 );
	scene.add( camera ); // since light is child of camera

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ));
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

```
##### This code means to control the direction of the object by following the mouse.
```javascript
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener( 'resize', onWindowResize, false );
```

##### This code is meant to define the random position coordinates of the eyes.
```javascript
var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
for ( i = 0; i < faceVertexUvs.length; i ++ ) {
  var uvs = faceVertexUvs[ i ];
  var face = geometry.faces[ i ];
  for ( var j = 0; j < 3; j ++ ) {
    uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
    uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
  }
}
var cubescale = (Math.random() * 2-2)+ 1;
mesh = new THREE.Mesh( geometry, material );
mesh.position.x = Math.random()*-200;
mesh.position.y = Math.random()*-100+40;

mesh.scale.x = cubescale;
mesh.scale.y = cubescale;
mesh.scale.z = cubescale;

cubes.push(mesh)
scene.add( mesh );
}

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
requestAnimationFrame( animate );
render();
}

function render() {
console.log(window.innerHeight)
cubes.forEach(function(c,i){

cubes[i].rotation.x = mouseY/window.innerHeight*2;
cubes[i].rotation.y = mouseX/window.innerWidth*2;
});
renderer.render( scene, camera );
}

function onWindowResize() {
windowHalfX = window.innerWidth / 2;
windowHalfY = window.innerHeight / 2;
camera.aspect = window.innerWidth / window.innerHeight;
renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
mouseX = event.clientX - windowHalfX;
mouseY = event.clientY - windowHalfY;
}
```

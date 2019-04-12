# Section 4

## 00-exercise-eight kinds of color cube

##### This code creates a scene, a camera, and some geometric cubes, and it adds the cube to the scene. It then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.
```javascript
var renderer, scene, camera;
var controls;
var cubes = [];
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(20, 20, 85);
  camera.lookAt(scene.position);

```
##### This code defines the lighting in the scene.

```javascript
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(0, 1000, 0);
scene.add(spotLight);

var ambLight = new THREE.AmbientLight(0xFFFFFF);
ambLight.position.set(0, 1000, 0);
ambLight.add(spotLight);
scene.add(ambLight);

//spotLight.castShadow = true;

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(0x17293a);
renderer.setSize(W, H);
//renderer.shadowMapEnabled = true;

controls = new THREE.OrbitControls(camera, renderer.domElement);
```

##### Create a two dimensional grid of objects, and position them accordingly.

```javascript
for (var x = -10; x < 10; x += 5) { // Start from -45 and sequentially add one every 5 pixels
for (var y = -10; y < 10; y += 5) {
for (var z = -10; z<=10; z += 5) {
```
##### This code defines that the squares will show different colors at different positions.

```javascript
//Concatenation of the x and y values (open Console to )
console.log("X:"+x+",Y:"+y+",Z:"+z);

var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
//The color of the material is assigned a random color

if (         x >= 0 &&  y>= 0 && z >=0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xF62280});
} else if  ( x <= 0 && y >= 0 && z >= 0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFB5B5});
} else if  ( x >= 0 && y <= 0 && z >= 0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xB9B9FF});
} else if  ( x <= 0 && y <= 0 && z >= 0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xC4E1FF});
} else if  ( x >= 0 && y >= 0 && z >= 0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0x96FED1});
} else if  ( x <= 0 && y >= 0 && z <= 0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xA6FFA6});
} else if  ( x >= 0 && y <= 0 && z <= 0){
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF6F});
} else {
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFD1A4});
}
var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
```
##### Defines the position of the square.

```javascript
//mesh.castShadow = true;
mesh.position.x = x;
mesh.position.y = y;
mesh.position.z = z;
//mesh.scale.y= 0.5;
scene.add(mesh);
cubes.push(mesh);
}
}
}
console.log(cubes);
document.body.appendChild(renderer.domElement);
}

function drawFrame(){
requestAnimationFrame(drawFrame);

rot += 0.01;

cubes.forEach(function(c,i){
c.rotation.x = rot;
});


renderer.render(scene, camera);
}

init();
drawFrame();
```

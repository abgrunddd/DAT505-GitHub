if ( WEBGL.isWebGLAvailable() === false ) {



				document.body.appendChild( WEBGL.getWebGLErrorMessage() );



			}



			var camera, scene, renderer, stats;

			var pointLight, pointLight2, pointLight3;



			init();

			animate();



			function init() {



				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

				camera.position.set( 0, 10, 40 );



				scene = new THREE.Scene();

				scene.add( new THREE.AmbientLight( 0x111122 ) );



				// lights



				function createLight( color ) {



					var intensity = 1.5;



					var pointLight = new THREE.PointLight( color, intensity, 20 );

					pointLight.castShadow = true;

					pointLight.shadow.camera.near = 1;

					pointLight.shadow.camera.far = 60;

					pointLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects



					var geometry = new THREE.SphereBufferGeometry( 0.3, 12, 6 );

					var material = new THREE.MeshBasicMaterial( { color: color } );

					material.color.multiplyScalar( intensity );

					var sphere = new THREE.Mesh( geometry, material );

					pointLight.add( sphere );



					var texture = new THREE.CanvasTexture( generateTexture() );

					texture.magFilter = THREE.NearestFilter;

					texture.wrapT = THREE.RepeatWrapping;

					texture.wrapS = THREE.RepeatWrapping;

					texture.repeat.set( 1, 3.5 );



					var geometry = new THREE.SphereBufferGeometry( 2, 32, 8 );

					var material = new THREE.MeshPhongMaterial( {

						side: THREE.DoubleSide,

						alphaMap: texture,

						alphaTest: 0.5

					} );



					var sphere = new THREE.Mesh( geometry, material );

					sphere.castShadow = true;

					sphere.receiveShadow = true;

					pointLight.add( sphere );



					// custom distance material

					var distanceMaterial = new THREE.MeshDistanceMaterial( {

						alphaMap: material.alphaMap,

						alphaTest: material.alphaTest

					} );

					sphere.customDistanceMaterial = distanceMaterial;



					return pointLight;



				}



				pointLight = createLight( 0x0088ff );

				scene.add( pointLight );



				pointLight2 = createLight( 0xff8888 );

				scene.add( pointLight2 );


        pointLight3 = createLight( 0xff8888 );

        scene.add( pointLight3 );
				//



				var geometry = new THREE.BoxBufferGeometry( 30, 30, 30 );



				var material = new THREE.MeshPhongMaterial( {

					color: 0xa0adaf,

					shininess: 10,

					specular: 0x111111,

					side: THREE.BackSide

				} );



				var mesh = new THREE.Mesh( geometry, material );

				mesh.position.y = 10;

				mesh.receiveShadow = true;

				scene.add( mesh );



				//



				renderer = new THREE.WebGLRenderer( { antialias: true } );

				renderer.setPixelRatio( window.devicePixelRatio );

				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer.shadowMap.enabled = true;

				renderer.shadowMap.type = THREE.BasicShadowMap;

				document.body.appendChild( renderer.domElement );



				var controls = new THREE.OrbitControls( camera, renderer.domElement );

				controls.target.set( 0, 10, 0 );

				controls.update();



				stats = new Stats();

				document.body.appendChild( stats.dom );



				//



				window.addEventListener( 'resize', onWindowResize, false );



			}



			function onWindowResize() {



				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();



				renderer.setSize( window.innerWidth, window.innerHeight );



			}



			function generateTexture() {



				var canvas = document.createElement( 'canvas' );

				canvas.width = 2;

				canvas.height = 2;



				var context = canvas.getContext( '2d' );

				context.fillStyle = 'white';

				context.fillRect( 0, 1, 2, 1 );



				return canvas;



			}



			function animate() {



				requestAnimationFrame( animate );

				render();



			}



			function render() {



				var time = performance.now() * 0.001;



				pointLight.position.x = Math.sin( time * 0.6 ) * 9;

				pointLight.position.y = Math.sin( time * 0.7 ) * 9 + 5;

				pointLight.position.z = Math.sin( time * 0.8 ) * 9;



				pointLight.rotation.x = time;

				pointLight.rotation.z = time;



				time += 10000;



				pointLight2.position.x = Math.sin( time * 0.6 ) * 9;

				pointLight2.position.y = Math.sin( time * 0.7 ) * 9 + 5;

				pointLight2.position.z = Math.sin( time * 0.8 ) * 9;



				pointLight2.rotation.x = time;

				pointLight2.rotation.z = time;




        pointLight3.position.x = Math.sin( time * 0.6 ) * 9;

        pointLight3.position.y = Math.sin( time * 0.7 ) * 9 + 5;

        pointLight3.position.z = Math.sin( time * 0.8 ) * 9;



        pointLight3.rotation.x = time;

        pointLight3.rotation.z = time;




				renderer.render( scene, camera );



				stats.update();



			}

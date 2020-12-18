/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-12-16 20:43:19
* @Last Modified by:   Administrator
* @Last Modified time: 2020-12-18 09:32:38
*/


var leaf;
var leafs = [];
var drop_speed = [];
var min_speed = 3;
var max_speed = 7;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

(function() {
	let geom = new THREE.Geometry();
	vertices.forEach(v => geom.vertices.push(new THREE.Vector3(...v.map(a => 20 * a))));
	faces.forEach(f => geom.faces.push(new THREE.Face3(...f)));
	geom.computeFaceNormals();
	geom.computeVertexNormals();
	leaf = new THREE.Mesh(
		geom, 
		new THREE.MeshBasicMaterial({color: '#F3BC45', wireframe: !1})
	);
	leaf.geometry.center();
	leaf.position.y = 3 * HEIGHT / 2;
	leaf.speed = Math.random() * (max_speed - min_speed) + min_speed;
	scene.add(leaf);
	leafs.push(leaf);
	for(let i=0; i<500; i++) {
		let leaf2 = leaf.clone();
		leaf2.position.x = 3 * WIDTH * (1/2 - Math.random() );
		leaf2.position.y = 3 * HEIGHT / 2 + Math.random() * HEIGHT / 3 ;
		leaf2.position.z = 10 * HEIGHT * (0.5 - Math.random() ) + HEIGHT;
		leaf2.rotation.x = Math.PI * (1/2 - Math.random() );
		leaf2.rotation.y = Math.PI * (1/2 - Math.random() );
		leaf2.rotation.z = Math.PI * (1/2 - Math.random() );
		leaf2.speed = Math.random() * (max_speed - min_speed) + min_speed;
		scene.add(leaf2);
		leafs.push( leaf2 );
	}
})();

camera.position.set(0, 0, 3 * HEIGHT);

(function animate() {
	leafs.map( leaf => {
		leaf.position.y -= leaf.speed;
		if( leaf.position.y < - 1.25 * HEIGHT ) {
			leaf.position.x = 3 * WIDTH * (1/2 - Math.random() );
			leaf.position.y = 3 * HEIGHT / 1.6;
			leaf.position.z = 10 * HEIGHT * (0.5 - Math.random() ) + HEIGHT;
		}
		leaf.rotation.x += Math.PI / 200 * Math.random();
		leaf.rotation.y += Math.PI / 600 * Math.random();
		leaf.rotation.z += Math.PI / 200 * Math.random();
	});
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();	

//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

let map;

const params = {
  showMap: false,
};

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });

//
  mesh = new THREE.Mesh(getGeometry(), new THREE.MeshStandardMaterial());
  mesh.material.flatShading = !params.smoothShading;
  if (map !== undefined && params.showMap) {

    mesh.material.map = map;
    mesh.material.needsUpdate = true;

  }

  render();

//

}






  // function (group) {

  //   const cerberus = group.children[0];
  //   const modelGeometry = cerberus.geometry;

  //   modifier = new EdgeSplitModifier();
  //   baseGeometry = BufferGeometryUtils.mergeVertices(modelGeometry);

  //   mesh = new THREE.Mesh(getGeometry(), new THREE.MeshStandardMaterial());
  //   mesh.material.flatShading = !params.smoothShading;
  //   mesh.rotateY(- Math.PI / 2);
  //   mesh.scale.set(3.5, 3.5, 3.5);
  //   mesh.translateZ(1.5);
  //   scene.add(mesh);

  //   if (map !== undefined && params.showMap) {

  //     mesh.material.map = map;
  //     mesh.material.needsUpdate = true;

  //   }

  //   render();

  // }












function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);


//
new THREE.TextureLoader().load('./house/textures/Material_diffuse2.png', function (texture) {

  map = texture;

  if (mesh !== undefined && params.showMap) {

    mesh.material.map = map;
    mesh.material.needsUpdate = true;

  }

});

const gui = new GUI({ name: 'Edge split modifier parameters' });

gui.add(params, 'showMap').onFinishChange(updateMesh);
//Variables for setup

let containerQ;
let cameraQ;
let rendererQ;
let sceneQ;
let houseQ;

let container;
let camera;
let renderer;
let scene;
let house;

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
  camera.position.set(0, 2, 10);

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
    house = gltf.scene;

    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.y += 0.009;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

///////

function init() {
  containerQ = document.querySelector(".scene2");

  //Create scene
  sceneQ = new THREE.Scene();

  const fov = 35;
  const aspect = containerQ.clientWidth / containerQ.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  cameraQ = new THREE.PerspectiveCamera(fov, aspect, near, far);
  cameraQ.position.set(1, 2, 10);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  sceneQ.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  sceneQ.add(light);

  //Renderer
  rendererQ = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  rendererQ.setSize(containerQ.clientWidth, containerQ.clientHeight);
  rendererQ.setPixelRatio(window.devicePixelRatio);

  containerQ.appendChild(rendererQ.domElement);




  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene2.gltf", function (gltf) {
    sceneQ.add(gltf.sceneQ);
    houseQ = gltf.sceneQ;

    animateQ();
  });
}

function animateQ() {
  requestAnimationFrame(animateQ);
  houseQ.rotation.y += 0.009;
  rendererQ.render(sceneQ, cameraQ);
}

init();

function onWindowResize() {
  cameraQ.aspect = containerQ.clientWidth / containerQ.clientHeight;
  cameraQ.updateProjectionMatrix();

  rendererQ.setSize(containerQ.clientWidth, containerQ.clientHeight);
}

window.addEventListener("resize", onWindowResize);


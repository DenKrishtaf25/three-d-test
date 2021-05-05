//Variables for setup

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
}

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







// CHARACTER

const config = {

  skins: ["Material_diffuse.png", "Material_diffuse2.png"]
  
};

character = new MD2Character();
character.scale = 1;

character.onLoadComplete = function () {

  setupSkinsGUI(character);

};


character.loadParts(config);



// GUI

function labelize(text) {

  const parts = text.split(".");

  if (parts.length > 1) {

    parts.length -= 1;
    return parts.join(".");

  }

  return text;

}




function setupSkinsGUI(character) {

  const folder = gui.addFolder("Skins");

  const generateCallback = function (index) {

    return function () {

      character.setSkin(index);

    };

  };

  const guiItems = [];

  for (let i = 0; i < character.skinsBody.length; i++) {

    const name = character.skinsBody[i].name;

    playbackConfig[name] = generateCallback(i);
    guiItems[i] = folder.add(playbackConfig, name).name(labelize(name));

  }

}

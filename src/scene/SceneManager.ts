import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Cabinet } from "../objects/Cabinet";
import { CabinetConfig } from "../config/CabinetConfig";
import { ControlPanel } from "../ui/ControlPanel";

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cabinet: Cabinet;
  private config: CabinetConfig;
  private controls: OrbitControls;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(3, 2, 5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xf0f0f0);
    container.appendChild(this.renderer.domElement);

    // Better lighting setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    directional.castShadow = true;
    this.scene.add(directional);

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Smooth camera movement
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 20;
    this.controls.maxPolarAngle = Math.PI / 2; // Prevent camera going below ground

    // Initialize configuration and cabinet
    this.config = new CabinetConfig();
    this.cabinet = new Cabinet(this.config);
    this.scene.add(this.cabinet.getObject());
    
    // Initialize control panel
    new ControlPanel(this.config);

    this.setupControls();
    this.animate();
  }

  private setupControls(): void {
    // Handle window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    
    // Update OrbitControls (required when damping is enabled)
    this.controls.update();
    
    this.renderer.render(this.scene, this.camera);
  }
}

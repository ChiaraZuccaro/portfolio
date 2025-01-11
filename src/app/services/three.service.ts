import { Injectable } from '@angular/core';
import { AmbientLight, AxesHelper, Camera, Color, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  public settingsGroundScenario = {}

  public controls: OrbitControls;
 
  private ringInnerRadius = 93; // Inner radius of the ring
  private ringOuterRadius = 103; // Outer radius of the ring
  private ringCenterRadius = (this.ringInnerRadius + this.ringOuterRadius) / 2; // Center radius of the ring
  private roadYLevel = 0.7; // Height of the road above the map
  private cameraDistanceFromRing = 6; // Distance of the camera from the road
  private cameraHeight = 2.05; // Height of the camera above the road
  
  private fogColor: number = 0xcce0ff;
  private fogNear: number = 50;
  private fogFar: number = 100;

  public scene: Scene;
  public camera: Camera;
  public renderer: WebGLRenderer;

  constructor() { }

  public initScenario(canvas?: HTMLCanvasElement) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.renderer = new WebGLRenderer();

    this.scene.background = new Color(0xcce7ff);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    // ----
    document.body.appendChild(this.renderer.domElement);
    // ----

    // this.setPositionCamera();

    // DEV MODE
    const axesHelper = new AxesHelper(5);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set(0, 1.5, 0); // Punto attorno al quale orbitare
    // this.controls.update();

    this.scene.add(axesHelper, this.camera);
    // DEV MODE
    this.setLights();
    this.animate(this.cameraUpdate());
  }

  private cameraUpdate() {
    let angle = 0; // Initial angle of the camera position
    const rotationSpeed = 0.003; // Speed of rotation
    const lookAheadOffset = 0.02; // Offset to look slightly ahead

    return () => {
      // Update the camera's angle dynamically for movement
      angle -= rotationSpeed;

      // Calculate the camera's position using polar coordinates
      const cameraX = (this.ringCenterRadius + this.cameraDistanceFromRing) * Math.cos(angle);
      const cameraY = this.roadYLevel + this.cameraHeight; // Keep the height constant
      const cameraZ = (this.ringCenterRadius + this.cameraDistanceFromRing) * Math.sin(angle);

      // Set the camera's position
      this.camera.position.set(cameraX, cameraY, cameraZ);

      // Calculate the target point slightly ahead of the camera's current position
      const lookAtTargetX = this.ringCenterRadius * Math.cos(angle + lookAheadOffset); // Slightly ahead on the ring
      const lookAtTargetZ = this.ringCenterRadius * Math.sin(angle + lookAheadOffset); // Slightly ahead on the ring
      const lookAtTarget = new Vector3(lookAtTargetX, this.roadYLevel, lookAtTargetZ);

      // Make the camera look at the dynamically calculated point
      this.camera.lookAt(lookAtTarget);
    };
  }

  private setLights() {
    const ambientLight = new AmbientLight(0xd8a200, 1); // Luce ambientale

    const directionalLight = new DirectionalLight(0xffce52, 3); // Luce direzionale
    directionalLight.position.set(1, 1, 1);

    this.scene.add(ambientLight, directionalLight);
  }

  public addObj(obj: any) {
    this.scene.add(obj);
  }

  public animate(callback: () => void) {
    const animateLoop = (): void => {
      requestAnimationFrame(animateLoop);
      callback();
      // this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }
}

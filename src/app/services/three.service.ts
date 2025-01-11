import { Injectable } from '@angular/core';
import { AmbientLight, AxesHelper, Camera, Color, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  public settingsGroundScenario = {}

  public controls: OrbitControls;

  
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

    this.setPositionCamera();

    // DEV MODE
    const axesHelper = new AxesHelper(5);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set(0, 1.5, 0); // Punto attorno al quale orbitare
    // this.controls.update();

    this.scene.add(axesHelper, this.camera);
    // DEV MODE

    this.setLights();
  }

  private setPositionCamera() {
    // Configurazioni del ring (strada)
    const ringInnerRadius = 90; // Raggio interno del ring
    const ringOuterRadius = 100; // Raggio esterno del ring
    const ringCenterRadius = (ringInnerRadius + ringOuterRadius)  / 2; // Centro del ring
    const roadYLevel = 0.01; // Altezza della strada rispetto alla mappa

    // Configurazione della camera
    const cameraDistanceFromRing = 10; // Distanza della camera dall'esterno del ring
    const cameraHeight = 3; // Altezza della camera sopra la strada

    const cameraAngle = Math.PI / 4; // Angolo della posizione della camera (45°)

    // Calcolo posizione della camera accanto al ring
    const cameraX = (ringCenterRadius + cameraDistanceFromRing) * Math.cos(cameraAngle);
    const cameraZ = (ringCenterRadius + cameraDistanceFromRing) * Math.sin(cameraAngle);
    const cameraY = roadYLevel + cameraHeight; // Altezza sopra il livello della strada

    // Creazione e posizionamento della camera
    this.camera.position.set(cameraX, cameraY, cameraZ);
    this.camera.rotation.set(0, Math.PI / 3,0);
  }

  private setLights() {
    const ambientLight = new AmbientLight(0xd8a200, 1); // Luce ambientale

    const directionalLight = new DirectionalLight(0xffce52, 3); // Luce direzionale
    directionalLight.position.set(1, 1, 1);

    this.scene.add(ambientLight, directionalLight);
  }

  private addFog() {

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

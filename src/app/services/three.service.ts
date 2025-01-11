import { Injectable } from '@angular/core';
import { CameraCustom } from '@app/classes/camera.class';
import { Sunlight } from '@app/classes/sunlight.class';
import { AxesHelper, Camera, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
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

    // this.setPositionCamera();

    // DEV MODE
    const axesHelper = new AxesHelper(5);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.target.set(0, 1.5, 0); // Punto attorno al quale orbitare
    // this.controls.update();

    this.scene.add(axesHelper, this.camera);
    // DEV MODE
  }

  public addObj(obj: any) {
    this.scene.add(obj);
  }

  public animate(callback: () => void) {
    const sunlight = new Sunlight(this.scene);
    const camera = new CameraCustom();

    const animateLoop = (): void => {
      requestAnimationFrame(animateLoop);
      callback();
      sunlight.update(this.camera);
      camera.update(this.camera);
      // this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }
}

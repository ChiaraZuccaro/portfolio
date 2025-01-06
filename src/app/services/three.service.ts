import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  static instance: ThreeService;

  public Three = THREE;
  public controls: OrbitControls;

  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;

  constructor() { ThreeService.instance = this }

  public initScenario(canvas?: HTMLCanvasElement) {
    this.scene = new this.Three.Scene();
    this.camera = new this.Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.renderer = new this.Three.WebGLRenderer();

    this.scene.background = new THREE.Color(0xcce7ff);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    // ----
    document.body.appendChild(this.renderer.domElement);
    // ----
    this.camera.position.z = 5;

    // DEV MODE
    const axesHelper = new this.Three.AxesHelper(5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.5, 0); // Punto attorno al quale orbitare
    this.controls.update();
    // DEV MODE

    const ambientLight = new this.Three.AmbientLight(0xffffff, 0.5); // Luce ambientale

    const directionalLight = new this.Three.DirectionalLight(0xffffff, 1); // Luce direzionale
    directionalLight.position.set(5, 10, 7.5);

    this.scene.add(axesHelper, ambientLight, directionalLight);
  }

  public addObj(obj: any) {
    this.scene.add(obj);
  }

  public animate(callback: () => void) {
    const animateLoop = (): void => {
      requestAnimationFrame(animateLoop);
      callback();
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }
}

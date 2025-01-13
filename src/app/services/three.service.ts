import { ElementRef, HostListener, inject, Injectable, NgZone } from '@angular/core';
import { CameraCustom } from '@app/classes/camera.class';
import { Sunlight } from '@app/classes/sunlight.class';
import { AxesHelper, Color, Fog, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  private ngZone = inject(NgZone);

  private isAnimating = true;
  private previousScrollY = 0; 

  public settingsGroundScenario = {}

  public controls: OrbitControls;
  
  private fogColor: number = 0xcce0ff;
  private fogNear: number = 50;
  private fogFar: number = 100;

  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;


  private addFog() {
    this.scene.fog = new Fog(this.fogColor, this.fogNear, this.fogFar);
  }

  private resizeListener(container: HTMLElement) {
    window.addEventListener('resize', () => {
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
    });
  }

  public initScenario(canvas: ElementRef) {
    const container: HTMLElement = canvas.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    console.log(container.clientWidth, container.clientHeight);
    
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 10000);
    this.renderer = new WebGLRenderer({ antialias: true });

    this.resizeListener(container);
    this.camera.position.set(0, 3, 0);

    this.scene.background = new Color(0xcce7ff);
    
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio( window.devicePixelRatio );

    // ----
    container.appendChild(this.renderer.domElement);
    // ----

    // DEV MODE
    const axesHelper = new AxesHelper(5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.5, 0); // Punto attorno al quale orbitare
    this.controls.update();

    this.addFog();
    // this.handleScroll();
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

      // sunlight.update(this.camera);
      camera.update(this.camera);
      // this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }
}

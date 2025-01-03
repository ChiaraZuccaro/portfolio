import { Injectable } from '@angular/core';
import { BoxParams, CylinderParams, TorusParams } from '@app/interfaces/three.interface';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.camera.position.z = 5;
  }

  initializeRenderer(canvas: HTMLCanvasElement): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(this.renderer.domElement);
  }

  animate(callback: () => void): void {
    const animateLoop = (): void => {
      requestAnimationFrame(animateLoop);
      callback();
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }

  addObject(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  createColor(color: number): THREE.Color {
    return new THREE.Color(color);
  }

  createBox({ width = 1, height = 1, depth = 1, color = 0x333333 }: BoxParams): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  }

  createCylinder({ radiusTop = 0.2, radiusBottom = 0.2, height = 0.05, color = 0x000000 }: CylinderParams): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  }

  createTorus({ radius = 1, tube = 0.4, radialSegments = 16, tubularSegments = 100, color = 0x333333 }: TorusParams): THREE.Mesh {
    const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
  }

  createGroup(): THREE.Group {
    return new THREE.Group();
  }
}

import { Camera, DirectionalLight, Scene } from "three";

export class Sunlight {
  private roadYLevel = 0.7;
  // 0xd8a200
  // 0xffce52
  private sunSettings = {
    color: 0xffa500,
    intensity: 1,
    position: { x: 0, y: this.roadYLevel, z: 0 }
  }

  private sunLight: DirectionalLight;

  constructor(scene: Scene) {
    this.setLights();
    scene.add(this.sunLight);
  }

  private setLights() {
    // Create the directional light
    this.sunLight = new DirectionalLight(this.sunSettings.color, this.sunSettings.intensity);
    this.sunLight.castShadow = true; // Enable shadows if needed
    // Adjust shadow properties (optional)
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 1;
    this.sunLight.shadow.camera.far = 500;
  }

  public update(camera: Camera) {
    // Get the current camera position
    const cameraPosition = camera.position;

    // Offset the sunlight behind the camera
    const sunDistance = 50; // Distance of the sun behind the camera
    const sunHeight = 10; // Height of the sun

    const sunX = cameraPosition.x - sunDistance * Math.cos(Math.PI / 4); // Offset behind camera
    const sunZ = cameraPosition.z - sunDistance * Math.sin(Math.PI / 4); // Offset behind camera
    const sunY = cameraPosition.y + sunHeight; // Height of the sun

    // Update the sunlight position
    this.sunLight.position.set(sunX, sunY, sunZ);

    // // Point the sunlight towards the center of the road
    this.sunLight.target.position.set(0, this.roadYLevel, 0);
    this.sunLight.target.updateMatrixWorld();
  };
}
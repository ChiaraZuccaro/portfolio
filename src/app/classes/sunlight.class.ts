import { Camera, DirectionalLight, Scene } from "three";

export class Sunlight {
  private roadYLevel = 0.7;
  // 0xd8a200
  // 0xffce52
  private sunSettings = {
    color: 0xffa500,
    intensity: 10,
    position: { x: 0, y: this.roadYLevel, z: 0 }
  }

  private sunlight: DirectionalLight;

  constructor(scene: Scene) {
    this.setLights();
    scene.add(this.sunlight);
  }

  private setLights() {
    // Create the directional light
    this.sunlight = new DirectionalLight(this.sunSettings.color, this.sunSettings.intensity);
    this.sunlight.castShadow = true; // Enable shadows if needed
    // Adjust shadow properties (optional)
    this.sunlight.shadow.mapSize.width = 2048;
    this.sunlight.shadow.mapSize.height = 2048;
    this.sunlight.shadow.camera.near = 1;
    this.sunlight.shadow.camera.far = 500;
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
    this.sunlight.position.set(sunX, sunY, sunZ);
    // Point the sunlight towards the center of the road
    this.sunlight.target.position.set(0, this.roadYLevel, 0);
    this.sunlight.target.updateMatrixWorld();
  };
}
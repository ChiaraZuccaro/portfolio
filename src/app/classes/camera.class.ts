import { Camera, Vector3 } from "three";

export class CameraCustom {
  private ringInnerRadius = 93; // Inner radius of the ring
  private ringOuterRadius = 103; // Outer radius of the ring
  private ringCenterRadius = (this.ringInnerRadius + this.ringOuterRadius) / 2; // Center radius of the ring
  private roadYLevel = 0.7; // Height of the road above the map
  private cameraDistanceFromRing = -11; // Distance of the camera from the road
  private cameraHeight = 2; // Height of the camera above the road

  private angle = 0;
  private rotationSpeed = 0.002;
  private lookAheadOffset = 0.13;
  
  public update(camera: Camera) {
    // Update the camera's angle dynamically for movement
    this.angle -= this.rotationSpeed;
    // Calculate the camera's position using polar coordinates
    const cameraX = (this.ringCenterRadius + this.cameraDistanceFromRing) * Math.cos(this.angle);
    const cameraY = this.roadYLevel + this.cameraHeight; // Keep the height constant
    const cameraZ = (this.ringCenterRadius + this.cameraDistanceFromRing) * Math.sin(this.angle);
    // Set the camera's position
    camera.position.set(cameraX, cameraY, cameraZ);
    // Calculate the target point slightly ahead of the camera's current position
    const lookAtTargetX = this.ringCenterRadius * Math.cos(this.angle + this.lookAheadOffset); // Slightly ahead on the ring
    const lookAtTargetZ = this.ringCenterRadius * Math.sin(this.angle + this.lookAheadOffset); // Slightly ahead on the ring
    const lookAtTarget = new Vector3(lookAtTargetX, this.roadYLevel, lookAtTargetZ);
    // Make the camera look at the dynamically calculated point
    camera.lookAt(lookAtTarget);
  }
}

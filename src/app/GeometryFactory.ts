import { CircleGeometry, CylinderGeometry, Group, Material, Mesh, MeshStandardMaterial, RingGeometry, SphereGeometry, TorusGeometry } from "three";
import { CircleParams, CylinderParams, RingParams, SphereParams, TorusParams } from "./interfaces/three.interface";
import { ThreeService } from "./services/three.service";

export class GeometryFactory {
  public threeService = ThreeService.instance;
  
  public group = new Group();

  public material: Material;

  //#region BufferGeometry Instances
  public torusGeoInstance(torus: TorusParams) {
    const paramsTorus = Object.values(torus);
    return new TorusGeometry(...paramsTorus)
  }

  public ringGeoInstance(ring: RingParams) {
    const paramsRing = Object.values(ring);
    return new RingGeometry(...paramsRing);
  }
  //#endregion

  //#region Mesh Instances
  public createSphere(sphere: SphereParams, material: Material) {
    const paramsSphere = Object.values(sphere);
    const sphereGeo = new SphereGeometry(...paramsSphere);
    return new Mesh(sphereGeo, material);
  }

  public createCylinder(cylinder: CylinderParams, material: Material) {
    const paramsCylinder = Object.values(cylinder);
    const cylinderObj = new CylinderGeometry(...paramsCylinder);
    return new Mesh(cylinderObj, material);
  }

  public createTorus(torus: TorusParams, material: Material) {
    const torusGeometry = this.torusGeoInstance(torus);
    return new Mesh(torusGeometry, material);
  }

  public createRing(ring: RingParams, material: Material) {
    const ringGeometry = this.ringGeoInstance(ring);
    return new Mesh(ringGeometry, material);
  }

  public createCircle(circle: CircleParams, material: Material) {
    const paramsCircle = Object.values(circle);
    const circleGeometry = new CircleGeometry(...paramsCircle);
    return new Mesh(circleGeometry, material);
  }
  //#endregion
}
import { CylinderGeometry, Group, Material, Mesh, MeshStandardMaterial, RingGeometry, SphereGeometry, TorusGeometry } from "three";
import { CylinderParams, RingParams, SphereParams, TorusParams } from "./interfaces/three.interface";
import { ThreeService } from "./services/three.service";

export class GeometryFactory {
  public threeService = ThreeService.instance;
  
  public group = new Group();

  public material: Material;

  public createMaterial() {
    return new MeshStandardMaterial();
  }

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
    const paramsTorus = Object.values(torus);
    const torusGeometry = new TorusGeometry(...paramsTorus);
    return new Mesh(torusGeometry, material);
  }

  public createRing(ring: RingParams, material: Material) {
    const paramsRing = Object.values(ring);
    const ringGeometry = new RingGeometry(...paramsRing);
    return new Mesh(ringGeometry, material);
  }
}
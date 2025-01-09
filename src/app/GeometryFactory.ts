import { CylinderGeometry, Group, Material, Mesh, SphereGeometry } from "three";
import { CylinderParams, SphereParams } from "./interfaces/three.interface";
import { ThreeService } from "./services/three.service";

export class GeometryFactory {
  public threeService = ThreeService.instance;
  
  public group = new Group();

  public material: Material;

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
}
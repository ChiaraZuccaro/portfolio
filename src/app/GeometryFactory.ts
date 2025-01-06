import { ColorRepresentation, Material } from "three";
import { CylinderParams, SphereParams } from "./interfaces/three.interface";
import { ThreeService } from "./services/three.service";

export class GeometryFactory {
  public threeService = ThreeService.instance;
  public Three = this.threeService.Three;
  
  public group = new this.Three.Group();

  public color: ColorRepresentation;
  public material: Material;

  public createSphere(sphere: SphereParams, material: Material) {
    const paramsSphere = Object.values(sphere);
    const sphereGeo = new this.Three.SphereGeometry(...paramsSphere);
    return new this.Three.Mesh(sphereGeo, material);
  }

  public createCylinder(cylinder: CylinderParams, material: Material) {
    const paramsCylinder = Object.values(cylinder);
    const cylinderObj = new this.Three.CylinderGeometry(...paramsCylinder);
    return new this.Three.Mesh(cylinderObj, material);
  }
}